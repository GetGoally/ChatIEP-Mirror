import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { Message } from '@/types/goally-chat';

import {
  CHAT_RESPONSE_ERROR_MESSAGE,
  CHAT_RESPONSE_STATUS_DONE,
  DEFAULT_PROMTS,
  FIRST_PROMT,
} from '../app/const';

import { v4 as uuidv4 } from 'uuid';

interface ChatContextType {
  s3_file_path: string;
  error: string;
  index: string;
  loaded: boolean;
  messages: Message[];
  loading: boolean;
  messageIsStreaming: boolean;
  showDefaultPromt: boolean;
  showInputBar: boolean;
  setS3Path: (value: string) => void;
  setError: (value: string) => void;
  sendMessage: (promt: string) => void;
  createIndex: () => void;
  sendInitialMessage: () => void;
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
  showDefaultPromt: boolean;
  showInputBar: boolean;
};

enum ActionKind {
  SetS3Path = 'SET_S3_PATH',
  SetError = 'SET_ERROR',
  SetIndex = 'SET_INDEX',
  SetLoaded = 'SET_LOADED',
  AddMessage = 'ADD_MESSAGE',
  SetLoading = 'SET_LOADING',
  SetIsStrimming = 'SET_IS_STRIMMING',
  ToggleDefaultPromt = 'TOGGLE_DEFAULT_PROMT',
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
  showDefaultPromt: false,
  showInputBar: false,
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
    case ActionKind.SetLoaded: {
      return {
        ...state,
        loaded: true,
      };
    }
    case ActionKind.AddMessage: {
      const messages = [...state.messages];
      messages.push(action.payload);

      const lastMessage = state.messages[state.messages.length - 1];
      const userMessages = messages.filter((msg) => {
        return msg.role === 'user';
      });

      return {
        ...state,
        messages: messages,
        // we need show user input after using first default promt
        showInputBar:
          state.showInputBar === true
            ? true
            : DEFAULT_PROMTS.includes(lastMessage?.content),
        // we need to hide default promts after user submit more then 2 promts
        showDefaultPromt:
          userMessages.length >= 2 ? false : state.showDefaultPromt,
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
    case ActionKind.ToggleDefaultPromt: {
      return {
        ...state,
        showDefaultPromt: action.payload,
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
        throw new Error(CHAT_RESPONSE_ERROR_MESSAGE);
      }

      const response = await request.json();

      if (response.index_name_space) {
        dispatchAction({
          type: ActionKind.SetIndex,
          payload: response.index_name_space,
        });
      } else {
        throw new Error(CHAT_RESPONSE_ERROR_MESSAGE);
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
        throw new Error(CHAT_RESPONSE_ERROR_MESSAGE);
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
      } else {
        throw new Error(CHAT_RESPONSE_ERROR_MESSAGE);
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

  const sendInitialMessageHandler = async () => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search?index_name_space=${state.index}&query=${FIRST_PROMT}`,
        {
          method: 'GET',
          headers: {
            Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        },
      );

      if (!request.ok) {
        throw new Error(CHAT_RESPONSE_ERROR_MESSAGE);
      }

      const response = await request.json();

      if (response.status === CHAT_RESPONSE_STATUS_DONE) {
        dispatchAction({
          type: ActionKind.AddMessage,
          payload: {
            id: uuidv4(),
            role: 'assistant',
            content: `Based on this IEP, here are some of the things this student is struggling with:\n\n${response.answer}`,
          },
        });
        dispatchAction({
          type: ActionKind.ToggleDefaultPromt,
          payload: true,
        });
      } else {
        throw new Error(CHAT_RESPONSE_ERROR_MESSAGE);
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
        type: ActionKind.SetLoaded,
        payload: null,
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
        showDefaultPromt: state.showDefaultPromt,
        showInputBar: state.showInputBar,
        setS3Path: s3PathHandler,
        setError: errorHandler,
        sendMessage: sendMessageHandler,
        createIndex: createIndexHandler,
        sendInitialMessage: sendInitialMessageHandler,
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
