import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type IFilterItemProps = {
  icon?: React.ReactNode;
  active?: boolean;
  title?: string;
  content: string;
  onClick?: () => void;
};
export const FilterItem = (props: IFilterItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`duration-300 ${
              props.active
                ? "bg-blue-500 text-white hover:bg-blue-700"
                : "hover:bg-gray-200"
            }  flex items-center justify-center gap-2 px-3 py-1 rounded cursor-pointer`}
          >
            {props.icon && props.icon}

            {props.content && <p>{props.content}</p>}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
