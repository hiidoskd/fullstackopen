const Header = (course) => {
  return (
    <>
    <h1>{course.intro}</h1>
    </>
  )
};

const Part = (course) => {
  return (
    <p>
        {course.name} {course.exNum}
    </p>
  )
}

const Content = (content) => {
  return (
    <div>
      <Part name={content.parts[0].name} exNum={content.parts[0].exercises} ></Part>
      <Part name={content.parts[1].name} exNum={content.parts[1].exercises} ></Part>
      <Part name={content.parts[2].name} exNum={content.parts[2].exercises} ></Part>
    </div>
  )
};

const Total = (ex) => {
  return (
    <p>Number of exercises {ex.parts[0].exercises + ex.parts[1].exercises + ex.parts[2].exercises}</p> 
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header intro={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
    
  )
  }
export default App;
