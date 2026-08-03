import { useState } from "react";
import {
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import daipLogo from "../../assets/logos/daip-header-logo.png";

const inputClass = `
w-full
bg-transparent
text-white
placeholder:text-slate-500
outline-none
text-[14px]
`;

const fieldClass = `
group
flex
items-center
h-11
rounded-xl
border
border-cyan-500/20
bg-[#081B2E]/80
px-3
transition-all
duration-300
hover:border-cyan-400/35
focus-within:border-cyan-300
focus-within:ring-2
focus-within:ring-cyan-500/10
`;

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full justify-center">

      <style>{`
        @keyframes fadeUp{
          from{
            opacity:0;
            transform:translateY(18px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes glow{
          0%{
            box-shadow:0 0 0 rgba(0,0,0,0);
          }
          50%{
            box-shadow:
              0 0 24px rgba(34,211,238,.18),
              0 0 52px rgba(59,130,246,.08);
          }
          100%{
            box-shadow:0 0 0 rgba(0,0,0,0);
          }
        }

        @keyframes shine{
          from{
            background-position:-200%;
          }
          to{
            background-position:200%;
          }
        }
      `}</style>

      <div
        className="
          relative
          overflow-hidden
          w-full
          max-w-[430px]
          rounded-[22px]
          border
          border-cyan-500/20
          bg-[#071626]/86
          backdrop-blur-2xl
          px-7
          py-4
          shadow-[0_18px_45px_rgba(0,0,0,.45)]
        "
        style={{
          animation: "fadeUp .45s ease",
        }}
      >

        <div
          className="
            absolute
            left-1/2
            -top-24
            h-44
            w-44
            -translate-x-1/2
            rounded-full
            bg-cyan-400/10
            blur-[90px]
          "
        />

        <div className="flex justify-center">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-500/10
              px-4
              py-1.5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-cyan-300
            "
          >
            <ShieldCheck size={10} />
            GOVERNMENT ENTERPRISE
          </div>

        </div>

        <div className="mt-4 flex justify-center">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/20
              bg-white/[0.04]
            "
            style={{
              animation: "glow 5s ease infinite",
            }}
          >

            <img
              src={daipLogo}
              alt="DAIP"
              className="h-9 w-9 object-contain"
            />

          </div>

        </div>
		        <div className="mt-3 text-center">

          <h2
            className="
              text-[24px]
              font-bold
              tracking-wide
              text-white
            "
          >
            Welcome Back
          </h2>

          <p
            className="
              mt-1
              text-[13px]
              text-slate-400
            "
          >
            Secure access to
          </p>

          <p
            className="
              mt-0.5
              text-[14px]
              font-semibold
              leading-5
              text-cyan-300
            "
          >
            Digital Administration & Intelligence Platform
          </p>

        </div>

        <div className="my-3 flex items-center gap-3">

          <div className="h-px flex-1 bg-white/10" />

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.28em]
              text-slate-500
            "
          >
            LOGIN
          </span>

          <div className="h-px flex-1 bg-white/10" />

        </div>

        <div className="space-y-2">

          <div>

            <label
              className="
                mb-1
                block
                text-[12px]
                font-medium
                text-slate-300
              "
            >
              User ID
            </label>

            <div className={fieldClass}>

              <User
                size={16}
                className="
                  text-cyan-400
                  transition-colors
                  group-focus-within:text-cyan-300
                "
              />

              <input
                type="text"
                placeholder="Enter User ID"
                autoComplete="username"
                className={`ml-3 flex-1 ${inputClass}`}
              />

            </div>

          </div>

          <div>

            <label
              className="
                mb-1
                block
                text-[12px]
                font-medium
                text-slate-300
              "
            >
              Password
            </label>

            <div className={fieldClass}>

              <Lock
                size={16}
                className="
                  text-cyan-400
                  transition-colors
                  group-focus-within:text-cyan-300
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                autoComplete="current-password"
                className={`ml-3 flex-1 ${inputClass}`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  rounded-md
                  p-1
                  text-cyan-400
                  transition
                  hover:bg-cyan-500/10
                  hover:text-cyan-300
                "
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>

            </div>

          </div>
		          <div className="mt-3 space-y-2">

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <label
              className="
                flex
                items-center
                gap-2
                cursor-pointer
                text-[12px]
                text-slate-300
              "
            >

              <input
                type="checkbox"
                className="
                  h-3.5
                  w-3.5
                  accent-cyan-500
                "
              />

              Remember me

            </label>

            <button
              type="button"
              className="
                text-[12px]
                font-medium
                text-cyan-400
                transition-colors
                hover:text-cyan-300
              "
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="
              group
              relative
              flex
              h-11
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              via-sky-500
              to-blue-600
              text-[13px]
              font-semibold
              tracking-[0.08em]
              text-white
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:shadow-[0_10px_24px_rgba(34,211,238,.22)]
              active:scale-[0.99]
            "
          >

            <span
              className="
                absolute
                inset-0
                bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.18),transparent)]
                bg-[length:220%_100%]
                opacity-0
                group-hover:opacity-100
              "
              style={{
                animation: "shine 3s linear infinite",
              }}
            />

            <span className="relative flex items-center gap-2">

              Secure Sign In

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </span>

          </button>

          <div className="flex items-center gap-3">

            <div className="h-px flex-1 bg-white/10" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.28em]
                text-slate-500
              "
            >
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          <button
            type="button"
            className="
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-cyan-500/20
              bg-white/[0.04]
              text-[13px]
              font-medium
              text-white
              transition-all
              duration-300
              hover:border-cyan-400/40
              hover:bg-cyan-500/8
            "
          >

            <ShieldCheck
              size={15}
              className="text-cyan-300"
            />

            Government SSO Login

          </button>

        </div>
		        </div>

        <div
          className="
            mt-5
            border-t
            border-white/10
            pt-3
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-[11px]
                  font-medium
                  text-slate-300
                "
              >
                DAIP Enterprise
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-slate-500
                "
              >
                Version 1.0.0
              </p>

            </div>

            <div
              className="
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/5
                px-3
                py-1
              "
            >

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-cyan-300
                "
              >
                Secure Portal
              </span>

            </div>

          </div>

          <p
            
  className="
    mt-3
    text-center
    text-[10px]
    leading-5
    text-slate-500
  "
>
      
            Powered by{" "}
            <span className="font-medium text-cyan-300">
              KODEZY
            </span>
          </p>

        </div>

      </div>

    </div>

  );
}