import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';

const StateContext = createContext({} as {
  toggle: boolean,
  setToggle: Dispatch<SetStateAction<boolean>>
});

export const StateProvider = (props) => {
  const { children } = props;
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <StateContext.Provider value={{ toggle, setToggle }}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
