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
}
export default function ModalProject({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: any;
}) {
  const { setProject, project } = useProject();
  const schema = z.object({
    title: z
      .string({
        required_error: 'Por favor, insira o título',
      })
      .min(3, 'Por favor, insira o título')
      .trim(),
    description: z
      .string({
        required_error: 'Por favor, insira a descrição',
      })
      .min(3, 'Por favor, insira a descrição')
      .trim(),
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
    const result = await fetch('/api/project', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      }),
    });
    console.log('🚀 ~ file: modal-project.tsx:56 ~ submit ~ result:', result);
    const resultData = await result.json();
    console.log(
      '🚀 ~ file: modal-project.tsx:61 ~ submit ~ resultData:',
      resultData,
    );
    if (result.status === 200) {
      enqueueSnackbar('Projeto criado com sucesso', {
        variant: 'success',
      });
      setProject([...project, resultData.res]);
      setModal(false);
    } else {
      enqueueSnackbar('Erro ao criar projeto', {
        variant: 'error',
      });
    }
  };
  return (
    <ModalWrapper modal={modal} setModal={setModal}>
      <h2 className="text-2xl ">Criar Projeto</h2>
      <form className="my-4" onSubmit={handleSubmit(submit)}>
        <Input placeholder="Título" type="text" {...register('title')} />
        <TextArea
          placeholder="Descrição"
          type="text"
          {...register('description')}
        />

        <div className="flex justify-end items-end mt-5">
          <button className="py-1 px-3 bg-sky-300 text-white rounded-md font-medium mr-2">
            Salvar
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
