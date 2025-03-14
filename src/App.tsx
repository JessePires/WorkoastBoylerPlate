import { useState } from 'react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-[100%] h-screen flex flex-col justify-center items-center">
      <Button className="w-40 h-12 m-4" onClick={(): void => setCount((prevState) => prevState + 1)}>
        Click
      </Button>
      <Badge className="h-12 pl-6 pr-6">{`You've clicked ${count} times in button`}</Badge>
    </div>
  );
}

export default App;
