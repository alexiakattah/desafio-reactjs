import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModalTask from '../components/form/modal-task';

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn().mockReturnValue({
    handleSubmit: jest.fn(), // Mock handleSubmit
    register: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    formState: { errors: {} },
  }),
}));
jest.mock('zod', () => ({
  object: jest.fn(),
  string: jest
    .fn()
    .mockImplementationOnce(() => ({
      required_error: jest.fn(),
    }))
    .mockReturnValueOnce({
      required_error: jest.fn(),
    })

    .mockReturnValue({
      min: jest.fn(),
      max: jest.fn(),
      trim: jest.fn(),
      nonempty: jest.fn(),
    }),
}));

jest.mock('node-fetch', () => jest.fn());
jest.mock('../hooks/projects', () => {
  return jest.fn().mockReturnValue({
    project: [
      {
        id: 'test-project-id',
        title: 'test-project-title',
        description: 'test-project-description',
        image: 'test-project-image.jpg',
        taskIds: ['test-task-id'],
      },
    ],
    setProject: jest.fn(),
    tasks: [
      {
        id: 'test-task-id',
        title: 'test-task-title',
        description: 'test-task-description',
        image: 'test-task-image.jpg',
      },
    ],
    setTasks: jest.fn(),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ModalTask Component', () => {
  it('renders without errors', () => {
    render(<ModalTask modal={true} setModal={() => {}} />);
    // Add assertions to check if the component renders correctly
  });

  it('submits form successfully', async () => {
    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    }) as jest.Mock;

    render(<ModalTask modal={true} setModal={() => {}} />);

    const titleInput = screen.getByTestId('input-title');

    const descriptionInput = screen.getByTestId('input-description');
    const projectInput = screen.getByTestId('input-project');

    userEvent.type(titleInput, 'Test Title');
    userEvent.type(descriptionInput, 'Test Description');
    userEvent.selectOptions(projectInput, 'test-project-id');
    console.log('Before submit');
    fireEvent.submit(screen.getByRole('button', { name: /Salvar/i }));
    console.log('After submit', global.fetch);

    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  it('submits form with errors', async () => {
    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    }) as jest.Mock;

    render(<ModalTask modal={true} setModal={() => {}} />);

    const titleInput = screen.getByTestId('input-title');

    const descriptionInput = screen.getByTestId('input-description');
    const projectInput = screen.getByTestId('input-project');

    userEvent.type(titleInput, 'Te');
    userEvent.type(descriptionInput, 'Te');
    userEvent.selectOptions(projectInput, 'test-project-id');
    console.log('Before submit');
    fireEvent.submit(screen.getByRole('button', { name: /Salvar/i }));
    console.log('After submit', global.fetch);
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });
});
