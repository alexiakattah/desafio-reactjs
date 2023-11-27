import useProject from '@/app/hooks/projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from './input';
import ModalWrapper from './modal-wrapper';
import { TextArea } from './text-area';

interface IFormProps {
  title: string;
  description: string;
  project: string;
  tags: string[];
}
const tags = [
  {
    title: 'Development',
    id: 1,
  },
  {
    title: 'Desgin',
    id: 2,
  },
];
export default function ModalTask({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: any;
}) {
  const { project, setTasks, tasks } = useProject();

  const schema = z.object({
    title: z
      .string({
        required_error: 'Por favor, insira o título',
      })
      .min(3, 'Por favor, insira o título'),
    description: z
      .string({
        required_error: 'Por favor, insira a descrição',
      })
      .min(3, 'Por favor, insira a descrição'),
    project: z.string().nonempty({ message: 'Selecione um projeto' }),
  });

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const submit = async (data: IFormProps) => {
    const res = await fetch('/api/task', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
    setTasks([...tasks, json]);
    enqueueSnackbar('Task criada com sucesso', { variant: 'success' });
    setModal(!modal);
  };
  function getRandomColor() {
    let color = 'rgba(';
    for (let i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 256) + ',';
    }
    color += '0.1)';
    return color;
  }
  return (
    <ModalWrapper modal={modal} setModal={setModal}>
      <h2 className="text-2xl ">Criar task</h2>
      <form className="my-4" onSubmit={handleSubmit(submit)}>
        <Input
          placeholder="Título"
          type="text"
          data-testid="input-title"
          {...register('title', {})}
          errors={errors.title && errors.title.message}
        />
        <TextArea
          placeholder="Descrição"
          type="text"
          data-testid="input-description"
          {...register('description', {})}
          errors={errors.description && errors.description.message}
        />
        <select
          {...register('project')}
          data-testid="input-project"
          className="w-full p-2 bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-1 mb-1  focus:ring-green-secondary"
        >
          <option className="text-gray-400" value={''}>
            Selecione um projeto
          </option>
          {project.length > 0 &&
            project.map((project, index) => {
              return (
                <option
                  key={index}
                  value={project.id}
                  className="text-gray-400"
                >
                  {project.title}
                </option>
              );
            })}
        </select>
        {errors.project && (
          <span className="text-red-500 text-sm">{errors.project.message}</span>
        )}
        <div>
          <p className="mb-2">Tags</p>
          <div className="flex space-x-4">
            {tags.map((tag, index) => {
              return (
                <span
                  key={index}
                  style={{ backgroundColor: getRandomColor() }}
                  {...register('tags', {})}
                  data-testid="input-tags"
                  className=" px-2 rounded cursor-pointer"
                >
                  {tag.title}
                </span>
              );
            })}
            <span className="bg-gray-100 text-gray-400 px-2 rounded cursor-pointer">
              + criar
            </span>
          </div>
        </div>
        <div className="flex justify-end items-end mt-5">
          <button className="py-1 px-3 bg-sky-300 text-white rounded-md font-medium mr-2">
            Salvar
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
