import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Instructions from './Exams/Instruction';
import Problem2 from './Exams/Problem2ConditionalRendering/Problem2';
import Problem3 from './Exams/Problem3UseRef/Problem3';
import Problem4 from './Exams/Problem4UseState/Problem4';
import Problem5 from './Exams/Problem5UseEffect/Problem5';
import Problem6 from './Exams/Problem6UseCallback/Problem6';
import Problem7 from './Exams/Problem7UseContext/Problem7';
import Problem8 from './Exams/Problem8UseReducer/Problem8';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Instructions />,
    },
    {
      path: '/problem1',
      element: (
        <div>
          <h1>Problem 1 - Component (10pts)</h1>
          <p>
            Create a new component that accept a properties{' '}
            <strong>Students name, course and section</strong>. Create your new
            component inside the <pre>Exams/Problem1Compoent</pre> folder and
            display your component inside this Router element.
          </p>
        </div>
      ),
    },
    {
      path: '/problem2',
      element: (
        <div>
          <h1>Problem 2: Conditional Rendering (10pts)</h1>
          <p>
            Student must show or hide the profile when the users click the
            button.
          </p>
          <Problem2 />
        </div>
      ),
    },
    {
      path: '/problem3',
      element: (
        <div>
          <h1>Problem 3: useRef (10pts)</h1>
          <p>
            Students must programatically focus/select on the empty textbox when
            the users click the button.
          </p>
          <Problem3 />
        </div>
      ),
    },
    {
      path: '/problem4',
      element: (
        <div>
          <h1>Problem 4: useState (10pts)</h1>
          <p>
            Students must save/store the form values and display it as an
            object.
          </p>
          <Problem4 />
        </div>
      ),
    },
    {
      path: '/problem5',
      element: (
        <div style={{ height: '100%' }}>
          <h1>Problem 5: useEffect (20pts)</h1>
          <p>
            Students must dismiss the loading component 3 seconds after
            successful render of the page. Students must also write a program to
            detect if the user is typing or idle.
          </p>
          <video height={320} width={240} controls>
            <source src={'./useEffect.mp4'} type='video/mp4' />
          </video>
          <Problem5 />
        </div>
      ),
    },
    {
      path: '/problem6',
      element: (
        <div style={{ height: '100%' }}>
          <h1>Problem 6: useCallback (50pts)</h1>
          <video height={240} width={320} controls>
            <source src={'./useCallback.mp4'} type='video/mp4' />
          </video>
          <p>
            Students must create a function with useCallback for the following:
          </p>
          <ol>
            <li>
              Edit Button - must select a put the values to the textbox above
              the page.
            </li>
            <li>Delete Button - must remove/delete the entire row.</li>
            <li>Save Button - must save/add a new object to the array.</li>
            <li>
              Update Button - must update the entire row based fron the new
              values from form fields/textboxes.
            </li>
            <li>
              Clear Button - Remove or clear all the values in the form
              fields/textbox.
            </li>
          </ol>

          <Problem6 />
        </div>
      ),
    },
    {
      path: '/problem7',
      element: (
        <div style={{ height: '100%' }}>
          <h1>Problem 7: useContext (40pts)</h1>
          <video height={240} width={320} controls>
            <source src={'./useContext.mp4'} type='video/mp4' />
          </video>
          <ol>
            <li>
              Students must use the useContext to store the value from mock
              data.
            </li>
            <li>
              Using the useContext, students must display all the values to
              table inside Lists(Lists.jsx) Component.
            </li>
            <li>
              By clicking the select button, students must store the selected
              row to useContext and display it using the Selected(Selected.jsx)
              Component.
            </li>
          </ol>

          <Problem7 />
        </div>
      ),
    },
    {
      path: '/problem8',
      element: (
        <div style={{ height: '100%' }}>
          <h1>Problem 8: useReducer (50pts)</h1>
          <ol>
            <li>
              Using the form above the components, students must implement a
              Create function with useReducer. (Tip:Use array.push() )
            </li>
            <li>
              By clicking any row, students must implement a Read function with
              useReducer.
            </li>
            <li>Students must implement a Create function with useReducer.</li>
            <li>
              By clicking the Edit Button, students must load the row values to
              the form.
            </li>
            <li>
              By clicking the Delete Button, students must remove the entire
              row.
            </li>
            <li>
              By clicking the Clear Button, students must clear the form fields.
            </li>
          </ol>

          <Problem8 />
        </div>
      ),
    },
  ]);

  return (
    <div className='App'>
      <h1>ADT313 Prelims Retake & Special Exam</h1>
      <ol className='navigation' start='0'>
        <li>
          <a href='/'>Instructions</a>
        </li>
        <li>
          <a href='/problem1'>Problem 1 - Component (10Pts)</a>
        </li>
        <li>
          <a href='/problem2'>Problem 2 - Conditional Rendering (10Pts)</a>
        </li>
        <li>
          <a href='/problem3'>Problem 3 - UseRef (10Pts)</a>
        </li>
        <li>
          <a href='/problem4'>Problem 4 - UseState(10Pts)</a>
        </li>
        <li>
          <a href='/problem5'>Problem 5 - useEffect(20Pts)</a>
        </li>
        <li>
          <a href='/problem6'>Problem 6 - UseCallback(50Pts)</a>
        </li>
        <li>
          <a href='/problem7'>Problem 7 - useContext(40Pts)</a>
        </li>
        <li>
          <a href='/problem8'>Problem 8 - UseReducer(50Pts)</a>
        </li>
      </ol>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
