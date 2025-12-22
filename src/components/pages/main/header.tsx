import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'

export const Header = <TItem extends { label: string; value: string }>({
  items,
  value,
  onValueChange,
}: {
  items: TItem[]
  value: TItem['value']
  onValueChange: (value: TItem['value']) => void
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Chess Knight Exercises</h2>
      <Select onValueChange={onValueChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select an exercise" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="h-8">
        <Separator orientation="vertical" />
      </div>
      <ThemeToggle />
    </div>
  )
}
