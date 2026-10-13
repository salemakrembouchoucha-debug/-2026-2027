export type QuestionType = 'mcq' | 'essay' | 'fill_blank' | 'table_check' | 'specialized_cells_table' | 'drag_drop';

export interface MCQOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface SubQuestion {
  id: string;
  subNumber: string;
  prompt: string;
  modelAnswer: string;
  maxScore?: number;
}

export interface TableCheckRow {
  organelle: string;
  animalCell: boolean;
  plantCell: boolean;
}

export interface SpecializedCellRow {
  id: string;
  name: string;
  function: string;
  visualType: 'nerve' | 'ciliated' | 'fat' | 'rbc';
}

export interface MicroscopePartRow {
  partKey: string;
  name: string;
  function: string;
}

export interface DragDropItem {
  id: string;
  label: string;
  targetId: string;
}

export interface DragDropTarget {
  id: string;
  title: string;
  description: string;
}

export interface QuestionItem {
  id: string;
  unitId: 1 | 2;
  section: 'mcq' | 'essay';
  originalNumber: number;
  numberLabel: string;
  title?: string;
  prompt: string;
  type: QuestionType;
  options?: MCQOption[];
  correctOption?: 'A' | 'B' | 'C' | 'D';
  modelAnswer?: string;
  subQuestions?: SubQuestion[];
  tableCheckRows?: TableCheckRow[];
  specializedCells?: SpecializedCellRow[];
  microscopeParts?: MicroscopePartRow[];
  dragDropItems?: DragDropItem[];
  dragDropTargets?: DragDropTarget[];
  diagramId?: string;
  sourcePageRef: string;
  notes?: string;
}

export interface UnitInfo {
  id: 1 | 2;
  title: string;
  subtitle: string;
  description: string;
  mcqCount: number;
  essayCount: number;
}

export type AnswerVisibilityMode = 'student_hidden' | 'practice_check' | 'teacher_review';

export interface SubTopicInfo {
  id: string;
  unitId: 1 | 2;
  title: string;
  shortTitle: string;
  rangeDescription: string;
  questionCount: number;
}

export interface UserAnswerRecord {
  questionId: string;
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  essayAnswers?: Record<string, string>; // subQuestion id -> student text
  tableAnswers?: Record<string, { animal: boolean; plant: boolean }>;
  dragDropAnswers?: Record<string, string>; // targetId -> itemId
  isSelfEvaluatedCorrect?: boolean;
}

export interface StudentProfile {
  name: string;
  gradeSection: string;
  hasStarted: boolean;
  completionDate?: string;
}
