"use client";

import Image from "next/image";

export default function TimelineBackground() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <Image
                src="/background_timeline.svg"
                alt="Background"
                fill
                priority
                className="object-cover pointer-events-none"
                sizes="100vw"

            />
            {/* Title */}
            <h1 className="absolute inset-x-0 top-0 z-50 px-6 pt-6 text-center text-2xl font-['Press_Start_2P'] text-[#433625] drop-shadow-md">
                <span className="uppercase">Timeline</span>
            </h1>
            {/* Foreground row with exactly 10 boxes */}
            <div className="absolute inset-x-0 bottom-0 z-50 pointer-events-auto">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="relative translate-y-2">
                        <div
                            className={[
                                "flex flex-nowrap items-end justify-between gap-x-8",
                                "[&>*:nth-child(odd)]:-translate-y-32 -translate-x-22",
                                "[&>*:nth-child(even)]:-translate-y-12",
                                "[&>*]:transition-transform [&>*]:duration-200",
                            ].join(" ")}
                        >
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="relative w-[96px] h-[96px]">
                                    <Image
                                        key={i}
                                        src="/signboard.svg"
                                        alt={`Step ${i + 1}`}
                                        width={96}
                                        height={96}
                                    />
                                    {/* for first signboard box */}
                                    {i === 0 && (
                                        <span
                                            className="absolute
                                                left-[6%]
                                                top-[25%]
                                                flex flex-col items-center
                                                text-[0.51rem] font-['Press_Start_2P'] text-white
                                                space-y-2
                                                leading-tight">
                                                <span className="whitespace-nowrap">Gate Opens</span>
                                                 <span>8:00 am</span>
                                        </span>
                                    )}
                                </div>
                            ))}
                            {/* chicken jockey */}
                            <div className="absolute inset-x-0 flex justify-center -translate-y-10 z-40">
                                <Image
                                    src="/zombie-chicken.svg"
                                    alt="Zombie"
                                    width={100}
                                    height={100}
                                    className="drop-shadow-lg translate-y-32 -translate-x-10 animate-bounce"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Flag */}
            <Image src="/flag.svg"
                   alt="Side art"
                   width={140}
                   height={140}
                   className="absolute right-0 top-1/2 translate-y-38 -translate-x-10 pointer-events-none z-40" priority
            />
        </div>
    );
}
