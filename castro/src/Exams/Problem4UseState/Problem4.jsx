export default function Problem4() {
  return (
    <>
      <div style={{ display: 'block' }}>
        Name: <input type='text' />
      </div>
      <div style={{ display: 'block' }}>
        <p>Yearlevel:</p>
        <input type='radio' id='firstYear' name='yearlevel' value='Fist Year' />
          <label for='firstYear'>Fist Year</label>
        <br></br>
        <input
          type='radio'
          id='secondYear'
          name='yearlevel'
          value='Second Year'
        />
          <label for='secondYear'>Second Year</label>
        <br></br>
        <input
          type='radio'
          id='thirdYear'
          name='yearlevel'
          value='Third Year'
        />
          <label for='thirdYear'>Third Year</label>
        <br></br>
        <input
          type='radio'
          id='fourthYear'
          name='yearlevel'
          value='Fourth Year'
        />
          <label for='fourthYear'>Fourth Year</label>
        <br></br>
        <input
          type='radio'
          id='fifthYear'
          name='yearlevel'
          value='Fourth Year'
        />
          <label for='fifthYear'>Fifth Year</label>
        <br></br>
        <input type='radio' id='irregular' name='yearlevel' value='Irregular' />
          <label for='irregular'>Irregular</label>
        <br></br>
      </div>
      <div style={{ display: 'block' }}>
        Course:
        <select>
          <option value='BSCS'>BSCS</option>
          <option value='BSIT'>BSIT</option>
          <option value='BSCpE'>BSCpE</option>
          <option value='ACT'>ACT</option>
        </select>
      </div>
    </>
  );
}
