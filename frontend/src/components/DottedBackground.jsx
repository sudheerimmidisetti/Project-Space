import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const DottedBackground = () => {
    const canvasRef = useRef(null);

    useGSAP(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let dots = [];
        let mouse = { x: -1000, y: -1000 };
        
        // Brand colors converted to RGB
        const lightColor = { r: 148, g: 180, b: 193 }; // #94B4C1
        const accentColor = { r: 236, g: 239, b: 202 }; // #ECEFCA

        const updateSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initDots();
        };

        const spacing = 35;
        
        const initDots = () => {
            dots = [];
            const cols = Math.floor(width / spacing) + 2;
            const rows = Math.floor(height / spacing) + 2;
            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: i * spacing,
                        y: j * spacing,
                        originX: i * spacing,
                        originY: j * spacing,
                        size: 1.5,
                        baseOpacity: 0.15
                    });
                }
            }
        };

        const draw = (time) => {
            ctx.clearRect(0, 0, width, height);
            
            dots.forEach(dot => {
                // Water wave movement
                const waveY = Math.sin(time * 1.5 + dot.originX * 0.01) * 5;
                const waveX = Math.cos(time * 1.5 + dot.originY * 0.01) * 5;
                
                dot.x = dot.originX + waveX;
                dot.y = dot.originY + waveY;

                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 180;
                
                let opacity = dot.baseOpacity;
                let size = dot.size;
                let r = lightColor.r, g = lightColor.g, b = lightColor.b;

                // If hovered, light up and move away
                if (distance < maxDistance) {
                    const factor = 1 - distance / maxDistance;
                    opacity = dot.baseOpacity + factor * 0.7; // Up to 0.85 opacity
                    size = dot.size + factor * 2.5; // Up to 4.0 size
                    
                    // Transition to accent color
                    r = lightColor.r + (accentColor.r - lightColor.r) * factor;
                    g = lightColor.g + (accentColor.g - lightColor.g) * factor;
                    b = lightColor.b + (accentColor.b - lightColor.b) * factor;

                    // Repel slightly based on mouse distance
                    dot.x -= dx * factor * 0.15;
                    dot.y -= dy * factor * 0.15;
                }

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', updateSize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        updateSize();
        gsap.ticker.add(draw);

        return () => {
            window.removeEventListener('resize', updateSize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            gsap.ticker.remove(draw);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default DottedBackground;
