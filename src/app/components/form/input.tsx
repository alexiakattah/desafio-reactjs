import { ForwardRefRenderFunction, forwardRef } from 'react';
interface IInput {
  placeholder: string;
  type: string;
  errors?: string;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
  { placeholder, type, errors, ...rest },
  ref,
) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        className="w-full p-2 bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-secondary"
      />
      {errors && <p className="text-red-500 text-sm">{errors}</p>}
    </div>
  );
};
export const Input = forwardRef(InputBase);
