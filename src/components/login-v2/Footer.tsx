import {
  Building2,
  Landmark,
  Map,
  Droplets,
  House,
  Bus,
  Trees,
  Factory,
  FileText,
  ShieldCheck,
} from "lucide-react";

const departments = [
  { icon: Building2, label: "Development Authority" },
  { icon: Landmark, label: "Municipal Corporation" },
  { icon: Map, label: "Smart City" },
  { icon: Droplets, label: "Jal Nigam" },
  { icon: House, label: "Housing" },
  { icon: Bus, label: "Transport" },
  { icon: Trees, label: "Environment" },
  { icon: Factory, label: "Industries" },
  { icon: FileText, label: "Revenue" },
  { icon: ShieldCheck, label: "Public Services" },
];

export default function Footer() {
  return (
    <footer
      className="
        w-full
        h-14
        border-t
        border-cyan-500/15
        bg-slate-950/40
        backdrop-blur-xl
      "
    >
      <div
        className="
          h-full
          px-6
          flex
          items-center
          justify-between
        "
      >
        {/* LEFT SIDE */}

        <div
          className="
            flex-1
            flex
            items-center
            gap-5
            overflow-hidden
          "
        >
          {departments.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="
                flex
                items-center
                gap-2
                whitespace-nowrap
                group
                cursor-default
                transition-all
              "
            >
              <Icon
                size={16}
                className="
                  text-cyan-400
                  group-hover:text-cyan-300
                  transition-all
                "
              />

              <span
                className="
                  text-[12px]
                  text-slate-400
                  group-hover:text-white
                  transition-colors
                "
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}

        <div
          className="
            w-[320px]
            h-full
            flex
            items-center
            justify-end
            border-l
            border-cyan-500/20
            pl-6
            ml-4
          "
        >
          <div
            className="
              flex
              flex-col
              justify-center
              text-right
              leading-[1.2]
            "
          >
            <div
              className="
                text-[13px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-cyan-300
              "
            >
              DAIP Enterprise
            </div>

            <div
              className="
                text-[11px]
                text-slate-400
                mt-1
              "
            >
              Version 1.0.0
            </div>

            <div
              className="
                text-[11px]
                text-slate-500
                mt-1
                whitespace-nowrap
              "
            >
              Powered by KODEZY Services Pvt. Ltd.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}