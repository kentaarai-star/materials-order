/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace google {
  namespace script {
    interface Runner {
      withSuccessHandler(handler: (result: any) => void): Runner;
      withFailureHandler(handler: (error: Error) => void): Runner;
      getNotes(): void;
      getNoteById(id: string): void;
      createNote(noteData: { title: string; icon?: string; color?: string; iconColor?: string }): void;
      getUserEmail(): void;
    }
    const run: Runner;
  }
}

interface Note {
  id: string;
  title: string;
  icon: string;
  color: string;
  iconColor: string;
  userEmail: string;
  createdAt: string;
}
