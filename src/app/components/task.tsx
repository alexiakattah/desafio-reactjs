import { taskColor } from '@/utils/func';
import { BsDot } from 'react-icons/bs';

export default function Task({
  tags,
  title,
  description,
  createdAt,
  innerRef,
  draggableProps,
  dragHandleProps,
  ...rest
}: {
  tags: string[];
  title: string;
  createdAt: string;
  description: string;
  innerRef: any;
  draggableProps: any;
  dragHandleProps: any;
}) {
  const date = new Date(createdAt);
  const getDay = date.getDay();
  const getMonth = date.toLocaleString('pt-BR', { month: 'short' });

  return (
    <li
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      {...rest}
      className="bg-white leading-5 rounded-md px-4 py-5 mb-4 list-none	cursor-pointer hover:bg-gray-50 hover:bg-opacity-95 shadow"
    >
      <div className="space-y-2">
        <h1 className="font-medium">{title}</h1>
        <div className="flex text-sm text-gray-400 font-medium space-x-1 items-center">
          <span className="">
            {getDay} {getMonth}
          </span>
          <BsDot size={20} />

          <span className="">
            Criado por <strong>User</strong>
          </span>
        </div>
        <p className="text-sm">{description}</p>

        <div className="flex space-x-2">
          {tags &&
            tags.map((tag, index) => {
              return (
                <span
                  key={index}
                  className={`px-2 rounded text-sm text-gray-600 py-1 font-medium leading-5 ${taskColor[index]}`}
                >
                  {tag}
                </span>
              );
            })}
        </div>
      </div>
    </li>
  );
}
