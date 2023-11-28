import useProject from '@/app/hooks/projects';
import { taskColor } from '@/utils/func';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
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
  const [tag, setTag] = useState<string[]>([]);

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
    tags: z.array(
      z.string({
        required_error: 'Selecione uma tag',
      }),
    ),
  });

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: zodResolver(schema),
  });

  const submit = async (data: IFormProps) => {
    console.log('🚀 ~ file: modal-task.tsx:68 ~ submit ~ data:', data);
    const res = await fetch('/api/task', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await res.json();

    setTasks([...tasks, json]);
    enqueueSnackbar('Task criada com sucesso', { variant: 'success' });
    setModal(!modal);
  };

  const handleSelectTag = (e: any) => {
    const { innerText } = e.target;

    const selectedTags = getValues('tags') || []; // Certifique-se de obter uma matriz válida

    if (selectedTags.length === 3) {
      return enqueueSnackbar('Você só pode selecionar 3 tags', {
        variant: 'error',
      });
    }

    if (!selectedTags.length) {
      setValue('tags', [innerText]);
    } else {
      if (selectedTags.includes(innerText)) {
        const newTags = selectedTags.filter((item) => item !== innerText);
        setValue('tags', newTags);
        setTag(newTags);
      } else {
        setValue('tags', [...selectedTags, innerText]);
        setTag([...selectedTags, innerText]);
      }
    }

    // Aqui, você pode usar o console.log para verificar o valor atual de 'tags'
    console.log('Valor atual de tags:', getValues('tags'));
  };
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
            {tags.map((tagMap, index) => {
              const tagsSelected = getValues('tags') || [];
              const isTagSelected = tagsSelected.includes(tagMap.title);

              return (
                <span
                  key={index}
                  onClick={(e) => handleSelectTag(e)}
                  data-testid="input-tags"
                  className={`px-2 rounded cursor-pointer ${taskColor[index]} ${
                    isTagSelected ? 'bg-green-secondary' : ''
                  }`}
                >
                  {tagMap.title}
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
