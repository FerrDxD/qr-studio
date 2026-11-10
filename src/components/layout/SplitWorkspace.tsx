import type { ReactNode } from 'react';

interface SplitWorkspaceProps {
  sidebar: ReactNode;
  preview: ReactNode;
}

export function SplitWorkspace({ sidebar, preview }: SplitWorkspaceProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-0">
      <aside className="lg:w-[42%] flex-shrink-0 overflow-y-auto border-r border-border-subtle bg-bg-panel p-4">
        {sidebar}
      </aside>
      <main className="flex-1 min-w-0 p-4 lg:p-8 bg-bg-app">
        {preview}
      </main>
    </div>
  );
}
