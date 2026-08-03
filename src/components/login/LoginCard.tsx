import { useState } from "react";
import {
  Building2,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex items-center justify-center">

      <style>{`

      @keyframes fadeUp{

        from{
          opacity:0;
          transform:translateY(22px);
        }

        to{
          opacity:1;
          transform:translateY(0);
        }

      }

      @keyframes pulseGlow{

        0%{
          box-shadow:0 0 0 rgba(0,0,0,0);
        }

        50%{
          box-shadow:
          0 0 35px rgba(6,182,212,.20),
          0 0 70px rgba(59,130,246,.08);
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
        w-[420px]
        rounded-[28px]
        border
        border-cyan-400/20
        bg-slate-950/65
        backdrop-blur-2xl
        px-7
        py-6
        overflow-hidden
        shadow-[0_18px_60px_rgba(0,0,0,.45)]
        "
        style={{
          animation: "fadeUp .55s ease both",
        }}
      >

        {/* Background Glow */}

        <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[90px]" />

        {/* Enterprise Badge */}

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
            text-[10px]
            uppercase
            tracking-[0.28em]
            text-cyan-300
            "
          >

            <ShieldCheck size={13} />

            Government Enterprise

          </div>

        </div>

        {/* Logo */}

        <div className="mt-5 flex justify-center">

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
            bg-gradient-to-br
            from-cyan-500/15
            to-blue-600/20
            "
            style={{
              animation: "pulseGlow 5s ease infinite",
            }}
          >

            {/* Replace with DAIP Logo later */}

            <Building2
              size={28}
              className="text-cyan-300"
            />

          </div>

        </div>

        {/* Heading */}

        <div className="mt-5 text-center">

          <h2
            className="
            text-[30px]
            font-bold
            tracking-wide
            text-white
            "
          >
            Welcome Back
          </h2>

          <p
            className="
            mt-2
            text-sm
            leading-6
            text-slate-400
            "
          >
            Sign in to continue to
            <br />

            <span className="font-semibold text-cyan-300">
              Digital Administration &
              Intelligence Platform
            </span>

          </p>

        </div>

        {/* Divider */}

        <div className="my-6 flex items-center gap-3">

          <div className="h-px flex-1 bg-white/10" />

          <span
            className="
            text-[10px]
            uppercase
            tracking-[0.30em]
            text-slate-500
            "
          >
            LOGIN
          </span>

          <div className="h-px flex-1 bg-white/10" />

        </div>

        {/* Form */}

        <div className="space-y-4">
		          {/* ================= USER ID ================= */}

          <div>

            <label
              className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-300
              "
            >
              User ID
            </label>

            <div
              className="
              group
              flex
              h-12
              items-center
              rounded-xl
              border
              border-cyan-400/20
              bg-[#08192C]/80
              px-4
              transition-all
              duration-300
              hover:border-cyan-300/40
              focus-within:border-cyan-300
              focus-within:shadow-[0_0_0_3px_rgba(34,211,238,.08)]
              "
            >

              <User
                size={18}
                className="
                text-cyan-400
                transition-colors
                duration-300
                group-focus-within:text-cyan-300
                "
              />

              <input
                type="text"
                autoComplete="username"
                placeholder="Enter User ID"
                className="
                ml-3
                flex-1
                bg-transparent
                text-[15px]
                text-white
                placeholder:text-slate-500
                outline-none
                "
              />

            </div>

          </div>

          {/* ================= PASSWORD ================= */}

          <div>

            <label
              className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-300
              "
            >
              Password
            </label>

            <div
              className="
              group
              flex
              h-12
              items-center
              rounded-xl
              border
              border-cyan-400/20
              bg-[#08192C]/80
              px-4
              transition-all
              duration-300
              hover:border-cyan-300/40
              focus-within:border-cyan-300
              focus-within:shadow-[0_0_0_3px_rgba(34,211,238,.08)]
              "
            >

              <Lock
                size={18}
                className="
                text-cyan-400
                transition-colors
                duration-300
                group-focus-within:text-cyan-300
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter Password"
                className="
                ml-3
                flex-1
                bg-transparent
                text-[15px]
                text-white
                placeholder:text-slate-500
                outline-none
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                rounded-lg
                p-1.5
                text-cyan-400
                transition-all
                duration-300
                hover:bg-cyan-500/10
                hover:text-cyan-300
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* ================= REMEMBER ================= */}

          <div className="flex items-center justify-between pt-1">

            <label
              className="
              flex
              cursor-pointer
              items-center
              gap-2
              text-[13px]
              text-slate-300
              "
            >

              <input
                type="checkbox"
                className="
                h-4
                w-4
                accent-cyan-500
                "
              />

              Remember me

            </label>

            <button
              type="button"
              className="
              text-[13px]
              font-medium
              text-cyan-400
              transition-colors
              duration-300
              hover:text-cyan-300
              "
            >
              Forgot Password?
            </button>

          </div>
		            {/* ================= SIGN IN BUTTON ================= */}

          <button
            type="submit"
            className="
            group
            relative
            mt-1
            flex
            h-12
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            via-sky-500
            to-blue-600
            text-sm
            font-semibold
            tracking-[0.10em]
            text-white
            shadow-[0_12px_30px_rgba(34,211,238,.22)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_18px_40px_rgba(34,211,238,.32)]
            active:scale-[0.99]
            "
          >

            {/* Shine Effect */}

            <span
              className="
              absolute
              inset-0
              bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.30),transparent)]
              bg-[length:220%_100%]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
              "
              style={{
                animation: "shine 3s linear infinite",
              }}
            />

            <span className="relative flex items-center gap-2">

              Secure Sign In

              <ArrowRight
                size={17}
                className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                "
              />

            </span>

          </button>

          {/* ================= DIVIDER ================= */}

          <div className="flex items-center gap-3 py-1">

            <div className="h-px flex-1 bg-white/10" />

            <span
              className="
              text-[10px]
              uppercase
              tracking-[0.28em]
              text-slate-500
              "
            >
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* ================= GOVERNMENT SSO ================= */}

          <button
            type="button"
            className="
            group
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-cyan-400/20
            bg-white/5
            text-sm
            font-medium
            text-white
            transition-all
            duration-300
            hover:border-cyan-300/40
            hover:bg-cyan-500/10
            hover:-translate-y-0.5
            "
          >

            <ShieldCheck
              size={17}
              className="
              text-cyan-300
              transition-transform
              duration-300
              group-hover:rotate-6
              "
            />

            Government SSO Login

          </button>
		          </div>

      </div>

    </div>
  );
}