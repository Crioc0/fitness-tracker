export type SessionStatus =
  | 'idle'
  | 'work'
  | 'rest'
  | 'paused'
  | 'finished'

/**
 * WORK PHASE
 * duration — опционален
 */
export interface WorkPhase {
  id: string
  type: 'work'
  exerciseId: string
  exerciseTitle: string
  setNumber: number
  targetReps: number
  duration?: number
  completedReps?: number
  completedAt?: number
}

/**
 * REST PHASE
 * duration — обязателен
 */
export interface RestPhase {
  id: string
  type: 'rest'
  exerciseId: string
  exerciseTitle: string
  setNumber: number
  duration: number
}

export type WorkoutPhase = WorkPhase | RestPhase

export interface WorkoutSession {
  id: string
  workoutId: string
  templateId?: string
  title: string
  startedAt: number
  status: SessionStatus
  currentPhaseIndex: number
  phases: WorkoutPhase[]
}
