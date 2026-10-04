import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain, CalendarDays, Clock3 } from "lucide-react";

import Card from "../../../ui/card/Card";
import { theme } from "../../../../design-system";

const HeroHeader: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const hour = now.getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  }, [now]);

  const currentDate = useMemo(
    () =>
      now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [now]
  );

  const currentTime = useMemo(
    () =>
      now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [now]
  );

  return (
    <Card variant="glass" size="lg">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 240,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.md,
              marginBottom: theme.spacing.lg,
            }}
          >
            <Brain
              size={28}
              color={theme.colors.brand.primary}
            />

            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.colors.text.secondary,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Executive Intelligence Brief
              </div>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 15,
                  color: theme.colors.brand.secondary,
                }}
              >
                Development Authority Intelligence Platform
              </div>
            </div>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 36,
              fontWeight: 700,
              color: theme.colors.text.primary,
            }}
          >
            {greeting}, Chairman
          </h1>

          <p
            style={{
              marginTop: theme.spacing.md,
              lineHeight: 1.8,
              fontSize: 16,
              color: theme.colors.text.secondary,
              maxWidth: 760,
            }}
          >
            Welcome to your Executive Intelligence Brief.
            All strategic priorities, governance alerts,
            city operations and AI recommendations have
            been consolidated into a single executive view.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: theme.spacing.xl,
            marginTop: theme.spacing.xl,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.sm,
              color: theme.colors.text.secondary,
            }}
          >
            <CalendarDays size={18} />

            <span>{currentDate}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.sm,
              color: theme.colors.text.secondary,
            }}
          >
            <Clock3 size={18} />

            <span>{currentTime}</span>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default HeroHeader;