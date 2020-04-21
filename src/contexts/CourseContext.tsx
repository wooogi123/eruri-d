import React, { createContext, Dispatch, useReducer, useContext } from 'react';
import { Course } from '../libs/parser';

type Action =
  | {
      type: 'LOGIN';
      title?: string;
      prof?: string;
      url?: string;
  };

type CourseState = Array<Course>;
const CourseStateContext = createContext<CourseState | undefined>(undefined);

type CourseDispatch = Dispatch<Action>;
const CourseDispatchContext = createContext<CourseDispatch | undefined>(undefined);

function courseReducer(state: CourseState, action: Action): CourseState {
  switch (action.type) {
    case 'LOGIN': {
      return state.concat({
        title: action.title,
        prof: action.prof,
        url: action.url,
      });
    }
  }
}

export function CourseContextProvider({ children }: { children: React.ReactNode }) {
  const [courses, dispatch] = useReducer(courseReducer, []);

  return (
    <CourseDispatchContext.Provider value={dispatch}>
      <CourseStateContext.Provider value={courses}>
        {children}
      </CourseStateContext.Provider>
    </CourseDispatchContext.Provider>
  );
}

export function useCourseState() {
  const state = useContext(CourseStateContext);
  if (!state) throw new Error('CourseProvider not found');
  return state;
}

export function useCourseDispatch() {
  const dispatch = useContext(CourseDispatchContext);
  if (!dispatch) throw new Error('CourseProvider not found');
  return dispatch;
}

interface Download {
  status: string;
  message: string;
}

type DownloadAction =
  | {
    type: 'START';
    title: string;
    status: string;
  } | {
    type: 'ERROR';
    title: string;
    status: string;
    message: string;
  } | {
    type: 'END';
    title: string;
    status: string;
  };

type DownloadState = {
  [title: string]: Download;
}
const DownloadStateContext = createContext<DownloadState | undefined>(undefined);

type DownloadDispatch = Dispatch<DownloadAction>;
const DownloadDispatchContext = createContext<DownloadDispatch | undefined>(undefined);

function downloadReducer(state: DownloadState, action: DownloadAction): DownloadState {
  switch (action.type) {
    case 'START': {
      return Object.assign(
        {},
        state,
        {
          [action.title]: {
            status: action.status,
            message: '',
          }
        },
      );
    }
    case 'ERROR': {
      return Object.assign(
        {},
        state,
        {
          [action.title]: {
            status: action.status,
            message: action.message,
          }
        },
      );
    }
    case 'END': {
      return Object.assign(
        {},
        state,
        {
          [action.title]: {
            status: action.status,
            message: '',
          }
        },
      );
    }
  }
}

export function DownloadContextProvider({ children }: { children: React.ReactNode }) {
  const [downloads, dispatch] = useReducer(downloadReducer, {});

  return (
    <DownloadDispatchContext.Provider value={dispatch}>
      <DownloadStateContext.Provider value={downloads}>
        {children}
      </DownloadStateContext.Provider>
    </DownloadDispatchContext.Provider>
  )
};

export function useDownloadState() {
  const state = useContext(DownloadStateContext);
  if (!state) throw new Error('DownloadProvider not found');
  return state;
}

export function useDownloadDispatch() {
  const dispatch = useContext(DownloadDispatchContext);
  if (!dispatch) throw new Error('DownloadProvider not found');
  return dispatch;
}