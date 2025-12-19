import { Trans } from '@lingui/react/macro';

type QuestionTextProps = {
  number: number | null;
  children: React.ReactNode;
};

export function QuestionText({ number, children }: QuestionTextProps) {
  return (
    <div className="border rounded-xl px-4 py-3 relative my-8">
      <div className="absolute -top-3 px-2 rounded-md text-sm font-semibold bg-slate-200 text-slate-500">
        <Trans>Question {number}</Trans>
      </div>

      <div className="text-lg font-medium">{children}</div>
    </div>
  );
}
