import React, {useState} from 'react'

function EditPostForm({onCreate}){

    const [alpha2Code, setAlpha2Code] = useState('')
    const [callingCodes, setCallingCodes] = useState('')
    const [capital, setCapital] = useState('')
    const [Name, setName] = useState('')
    const [region, setRegion] = useState('')

    const onAlpha2CodeChanged = e => setAlpha2Code(e.target.value)
    const onCallingCodesChanged = e => setCallingCodes(e.target.value)
    const onCapitalChanged = e => setCapital(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onRegionChanged = e => setRegion(e.target.value)


    const obj = {
        "alpha2Code" : alpha2Code,
        "callingCodes" : [callingCodes],
        "capital" : capital,
        "name" : Name,
        "region" : region
    }

    return (
        <tr>
                    <th><input
                        type="text"
                        value={alpha2Code}
                        onChange={onAlpha2CodeChanged} />
                        </th>
                    <th><input
                        type="text"
                        value={callingCodes}
                        onChange={onCallingCodesChanged} />
                        </th>
                    <th><input
                        type="text"
                        value={capital}
                        onChange={onCapitalChanged} />
                        </th>
                    <th><input
                        type="text"
                        value={Name}
                        onChange={onNameChanged} />
                        </th>
                    <th><input
                        type="text"
                        value={region}
                        onChange={onRegionChanged} />
                    </th>
                    <th><button onClick={() => onCreate(obj)}>+</button></th>
                </tr>
    )
}

export default EditPostForm