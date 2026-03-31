import { formulas } from '@/data/formulas'

export async function fetchAllFormulas() {
  try {
    const formulasData = formulas
    return formulasData
    // const res = await axios.get(`/calendars/${role}`);
    // if (res.data) {
    //     return res.data;
    // }
  } catch (err) {
    throw err
  }
}

export async function fetchFormulaById(id) {
  try {
    const formulaData = formulas.filter((form) => form.id == id)
    return formulaData[0]
    // const res = await axios.get(`/calendars/${role}`);
    // if (res.data) {
    //     return res.data;
    // }
  } catch (err) {
    throw err
  }
}

export async function fetchFormulasByArray(idsArr) {
  try {
    if (!idsArr || idsArr.length === 0) {
      return []
    }
    const formulasData = formulas.filter((form) => idsArr.includes(form.id))
    return formulasData
    // const res = await axios.get(`/calendars/${role}`);
    // if (res.data) {
    //     return res.data;
    // }
  } catch (err) {
    throw err
  }
}
