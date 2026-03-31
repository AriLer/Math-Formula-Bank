'use client';


import { Loader } from "lucide-react";
import Image from "next/image";

export default function loading() {
    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col gap-2 items-center justify-center z-50">
            <div className="size-40 rounded-full overflow-hidden flex items-center justify-center">
                {/* <Loader className="animate-[spin_3s_linear_infinite] text-primary" size={75}/> */}
                {/* <Image
                    unoptimized
                    src="/assets/pedro-raccoon.gif"
                    width={100}
                    height={100}
                    alt="pedro"
                    className="rounded-full w-full h-full scale-110 object-cover overflow-hidden"
                    priority
                /> */}
            </div>
            {/* <h2 className="text-2xl">טוען...</h2> */}
        </div>
    );
}


