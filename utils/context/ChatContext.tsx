import React, { createContext, useContext, useReducer } from 'react';

import { Message } from '@/types/goally-chat';

import { CHAT_RESPONSE_STATUS_DONE } from '../app/const';

import { v4 as uuidv4 } from 'uuid';

interface ChatContextType {
  s3_file_path: string;
  error: string;
  index: string;
  loaded: boolean;
  messages: Message[];
  loading: boolean;
  messageIsStreaming: boolean;
  haveFirstResponse: boolean;
  haveSecondResponse: boolean;
  setS3Path: (value: string) => void;
  setError: (value: string) => void;
  sendMessage: (promt: string) => void;
  createIndex: () => void;
}

interface Props {
  children: React.ReactNode;
}

type State = {
  s3_file_path: string;
  error: string;
  index: string;
  loaded: boolean;
  messages: Message[];
  loading: boolean;
  messageIsStreaming: boolean;
  haveFirstResponse: boolean;
  haveSecondResponse: boolean;
};

enum ActionKind {
  SetS3Path = 'SET_S3_PATH',
  SetError = 'SET_ERROR',
  SetIndex = 'SET_INDEX',
  SetLoaded = 'SET_LOADED',
  AddMessage = 'ADD_MESSAGE',
  SetLoading = 'SET_LOADING',
  SetIsStrimming = 'SET_IS_STRIMMING',
  SetHaveFirstResponse = 'SET_HAVE_FIRST_RESPONSE',
}

type Action = {
  type: ActionKind;
  payload: any;
};

const defaultState: State = {
  s3_file_path: '',
  error: '',
  index: '',
  loaded: false,
  messages: [],
  loading: false,
  messageIsStreaming: false,
  haveFirstResponse: false,
  haveSecondResponse: false,
};

export const ChatContext = createContext<ChatContextType>(null as any);

const chatReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKind.SetS3Path: {
      return {
        ...state,
        s3_file_path: action.payload,
      };
    }
    case ActionKind.SetError: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionKind.SetIndex: {
      return {
        ...state,
        index: action.payload,
      };
    }
    case ActionKind.SetHaveFirstResponse: {
      return {
        ...state,
        haveFirstResponse: true,
      };
    }
    case ActionKind.SetLoaded: {
      return {
        ...state,
        loaded: true,
      };
    }
    case ActionKind.AddMessage: {
      const messages = [...state.messages];
      messages.push(action.payload);

      const messagesFromServer = messages.filter((message) => {
        return message.role === 'assistant';
      });

      return {
        ...state,
        messages: messages,
        haveFirstResponse: action.payload.role === 'assistant',
        haveSecondResponse: messagesFromServer.length >= 2,
      };
    }
    case ActionKind.SetLoading: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case ActionKind.SetIsStrimming: {
      return {
        ...state,
        messageIsStreaming: action.payload,
      };
    }
    default:
      return defaultState;
  }
};

export const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatchAction] = useReducer(chatReducer, defaultState);

  const s3PathHandler = (value: string) => {
    dispatchAction({
      type: ActionKind.SetS3Path,
      payload: value,
    });
  };

  const errorHandler = (value: string) => {
    dispatchAction({
      type: ActionKind.SetError,
      payload: value,
    });
  };

  const createIndexHandler = async () => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create_index`,
        {
          method: 'POST',
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            s3_key_path: state.s3_file_path,
          }),
        },
      );

      if (!request.ok) {
        throw new Error('Something go wrong. Please try later.');
      }

      const response = await request.json();

      if (response.index_name_space) {
        dispatchAction({
          type: ActionKind.SetIndex,
          payload: response.index_name_space,
        });
        dispatchAction({
          type: ActionKind.SetLoaded,
          payload: null,
        });
      } else {
        throw new Error('Something go wrong. Please try later.');
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatchAction({
          type: ActionKind.SetError,
          payload: error.message,
        });
      }
    }
  };

  const sendMessageHandler = async (promt: string) => {
    dispatchAction({
      type: ActionKind.SetError,
      payload: '',
    });

    dispatchAction({
      type: ActionKind.AddMessage,
      payload: {
        id: uuidv4(),
        role: 'user',
        content: promt,
      },
    });

    dispatchAction({
      type: ActionKind.SetLoading,
      payload: true,
    });

    dispatchAction({
      type: ActionKind.SetIsStrimming,
      payload: true,
    });

    try {
      // const controller = new AbortController();

      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search?index_name_space=${state.index}&query=${promt}`,
        {
          method: 'GET',
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
          // signal: controller.signal,
        },
      );

      if (!request.ok) {
        throw new Error('Something go wrong. Please try later.');
      }

      // const data = request.body;

      // if (!data) {
      //   dispatchAction({
      //     type: ActionKind.SetLoading,
      //     payload: false,
      //   });

      //   dispatchAction({
      //     type: ActionKind.SetIsStrimming,
      //     payload: false,
      //   });
      //   return;
      // }

      // dispatchAction({
      //   type: ActionKind.SetLoading,
      //   payload: false,
      // });

      // const reader = data.getReader();
      // const decoder = new TextDecoder();
      // let done = false;
      // let text = '';

      // while (!done) {
      //   const { value, done: doneReading } = await reader.read();
      //   done = doneReading;
      //   const chunkValue = decoder.decode(value);
      //   text += chunkValue;
      // }
      // console.log(data);
      // console.log(text);

      const response = await request.json();

      if (response.status === CHAT_RESPONSE_STATUS_DONE) {
        dispatchAction({
          type: ActionKind.AddMessage,
          payload: {
            id: uuidv4(),
            role: 'assistant',
            content: response.answer,
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatchAction({
          type: ActionKind.SetError,
          payload: error.message,
        });
      }
    } finally {
      dispatchAction({
        type: ActionKind.SetLoading,
        payload: false,
      });

      dispatchAction({
        type: ActionKind.SetIsStrimming,
        payload: false,
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        s3_file_path: state.s3_file_path,
        error: state.error,
        index: state.index,
        loaded: state.loaded,
        messages: state.messages,
        loading: state.loading,
        messageIsStreaming: state.messageIsStreaming,
        haveFirstResponse: state.haveFirstResponse,
        haveSecondResponse: state.haveSecondResponse,
        setS3Path: s3PathHandler,
        setError: errorHandler,
        sendMessage: sendMessageHandler,
        createIndex: createIndexHandler,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext<ChatContextType>(ChatContext);
  if (!context) {
    throw new Error(`useChatContext must be used within a ChatContextProvider`);
  }
  return context;
};
