const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} ></Part>
    )}
  </>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((sum, part)=> sum + part.exercises, 0)}></Total>
    </div>
  )
}
 export default Course