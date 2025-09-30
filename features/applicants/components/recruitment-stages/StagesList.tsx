"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StageTable } from "./StageTable";
import { formatType } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { useStageCount } from "../../api/recruitment-stages/get-stage-count";
import { SkeletonTable } from "@/components/skeleton/SkeletonTable";
const stages = [
  "HR_INT",
  "SKILL_TEST",
  "USER_INT",
  "FINAL_INT",
  "OFFERING",
  "HIRED",
  "REJECTED",
];

export function StagesList() {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <div className="p-4">
      <Tabs value={activeStage} onValueChange={setActiveStage}>
        <TabsList className="grid grid-cols-7 w-full rounded-lg border bg-muted mb-6">
          {stages.map((stage) => {
            const { data: count, isLoading } = useStageCount(stage);
            return (
              <TabsTrigger
                key={stage}
                value={stage}
                className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-md font-semibold transition-colors flex items-center gap-2"
              >
                {formatType(stage)}
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600"
                >
                  {isLoading ? "…" : count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {stages.map((stage) => (
          <TabsContent key={stage} value={stage}>
            <StageWrapper stage={stage} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function StageWrapper({ stage }: { stage: string }) {
  const { data: count, isLoading } = useStageCount(stage);

  if (isLoading) {
    return <SkeletonTable columns={5} rows={8} />;
  }

  if (!count) {
    return (
      <div className="text-center text-gray-500 py-8">
        Tidak ada data di stage {formatType(stage)}.
      </div>
    );
  }

  return <StageTable stage={stage} />;
}
