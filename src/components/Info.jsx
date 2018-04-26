import React from 'react';

const Info = (props) => {
  const {name, age, birthday} = props
  return (
    <div className={'Info'}>
      your name is {name}, your age is {age}, your birthday is {birthday}
    </div>
  );
};

export default Info;