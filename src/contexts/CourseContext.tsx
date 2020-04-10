import React, { createContext, Dispatch, useReducer, useContext } from 'react';
import { Course } from '../libs/parser';

type Action =
  | {
      type: 'LOGIN';
      title?: string;
      prof?: string;
      url?: string;
  };

type CourseState = Course[];
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