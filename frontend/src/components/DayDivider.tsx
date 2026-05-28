import { fmtDay } from "../utils/helpers";
import s from "../utils/styles";

interface DayDividerProps {
  date: string;
}

function DayDivider({ date }: DayDividerProps) {
  return (
    <div style={s.divWrap}>
      <div style={s.divLine} />
      <span style={s.divLabel}>{fmtDay(date)}</span>
      <div style={s.divLine} />
    </div>
  );
}

export default DayDivider;
