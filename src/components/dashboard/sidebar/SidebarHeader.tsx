import wordmark from "../../../assets/logos/wordmark.png";

export default function SidebarHeader() {
    return (
        <div className="border-b border-slate-800 px-4 pt-2 pb-2">
            <div className="flex items-center justify-center">
                <img
    src={wordmark}
    alt="DAIP Digital Administration & Intelligence Platform"
    className="
        w-full
        max-w-[180px]
        h-auto
        object-contain
        select-none
        -mt-2
    "
    draggable={false}
/>
            </div>
        </div>
    );
}