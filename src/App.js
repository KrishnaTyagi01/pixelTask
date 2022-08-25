import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState();
  const [filterData, setFilter] = useState();

  // console.log("data:", data);

  const handleFilter = (e) => {
    let inp = e.target.value.toLowerCase();

    const filtered = data.filter(user => {
      return user?.location?.city.toLowerCase().includes(inp) || user?.location?.state.toLowerCase().includes(inp) || 
      user?.location?.country.toLowerCase().includes(inp)|| user?.location?.postcode.toString().toLowerCase().includes(inp) || 
      user?.phone.toLowerCase().includes(inp) || user.name?.first.toLowerCase().includes(inp) ||
       user?.location?.coordinates?.latitude.toLowerCase().includes(inp)
      || user?.location?.coordinates?.longitude.toLowerCase().includes(inp)
    })

    setFilter(filtered);

    // console.log("Filtered: ",filtered);
  }


  const getData = async () => {
   await axios.get("https://randomuser.me/api?results=30").then(data => {
      // console.log(data);
      setData(data.data.results)
      setFilter(data.data.results)
    })
  }
  const handleSort = (head) => {
   
    function compare( a, b ) {
      if ( a.location[head] < b.location[head] ){
        return -1;
      }
      if ( a.location[head] > b.location[head] ){
        return 1;
      }
      return 0;
    }
    let sorted = [...filterData].sort(compare);
    setFilter(sorted);
  
    // setFilter(filterData);

    console.log("asc", sorted)
  }



  useEffect( async () => {
   await getData();
  }, [])

  return (
    <div className="App">

      <input type="text" style={{marginBottom:"2rem"}} onChange={(e) =>handleFilter(e)}/>

      <table className='maintable'>
      <tr className='mainrow'>
        <th className='tablehead' onClick={()=>handleSort('city')}>City</th>
        <th className='tablehead' onClick={()=>handleSort('state')}>State</th>
        <th className='tablehead' onClick={()=>handleSort('country')}>Country</th>
        <th className='tablehead' onClick={()=>handleSort('postcode')}>Postcode</th>
        <th className='tablehead'>number</th>
        <th className='tablehead'>name</th>
        <th className='tablehead'>latitude</th>
        <th className='tablehead'>longitude</th>
        <th className='tablehead'>picture</th>
        
      </tr>
        {filterData?.map((user) => (
          <tr className='mainrow'  >
            <td className='tabledata'>{user?.location?.city}</td>
            <td className='tabledata'>{user?.location?.state}</td>
            <td className='tabledata'>{user?.location?.country}</td>
            <td className='tabledata'>{user?.location?.postcode}</td>
            <td className='tabledata'>{user?.phone}</td>
            <td className='tabledata'>{user?.name?.first}</td>
            <td className='tabledata'>{user?.location?.coordinates?.latitude}</td>
            <td className='tabledata'>{user?.location?.coordinates?.longitude}</td>
            <td className='tabledata'>
              <img src={user?.picture?.thumbnail} alt="" />
              {user?.location?.city}</td>
            
          </tr>
    ))}
      </table>
    </div>
  );
}

export default App;
