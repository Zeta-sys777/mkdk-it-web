import {
  applicationDirections,
  directions,
  roadmapSteps,
  scenes as departmentScenes,
  teamMembers,
} from './department.data';
import type { RoadmapStep, TeamMember } from './department.data';

export interface SceneData {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  sceneNumber: number;
  shortLines: string[];
  chips: string[];
  cta: Array<{ label: string; href: string }>;
}

export interface CandidateData {
  name: string;
  role: string;
  badge: string;
  tone: string;
  focus: string[];
}

export interface ToolkitCardData {
  id: string;
  title: string;
  text: string;
  caption: string;
  format: string;
  theme: 'cyan' | 'green' | 'gold' | 'violet';
  accent: string;
}

export { applicationDirections, directions, roadmapSteps, teamMembers };
export type { RoadmapStep, TeamMember };

export const scenes: SceneData[] = departmentScenes.map((scene) => ({
  ...scene,
  shortLines: scene.body,
  chips: [],
  cta: [],
}));

export const candidates: CandidateData[] = [];
export const toolkitCards: ToolkitCardData[] = [];
