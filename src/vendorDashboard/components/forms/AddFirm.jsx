import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

function AddFirm() {

  const [firmName,setFirmName] = useState("");
  const [area,setArea] = useState("");
  const [category,setCategory] = useState([]);
  const [region,setRegion] =useState([]);
  const [offer,setOffer] = useState("");
  const[file,setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item) => item!== value));
    }
    else{
      setCategory([...category,value])
    }
  }

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item) => item!== value));
    }
    else{
      setRegion([...region,value])
    }
  }

  const handleImageUpload = async(event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  }

  const handleFirmSubmit = async(e) => {
    e.preventDefault();
    try{
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        console.error("User not Authenticated");
      }

      const formData = new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);

      category.forEach((value) => {
        formData.append('category',value)
      });

      region.forEach((value) => {
        formData.append('region',value)
      })

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
      });

      const data = await response.json();
      if(response.ok){
        console.log(data);
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setFile(null);
        setOffer("");
        alert("Firm Added Successfully")
      }else if(data.message === 'vendor Can have only One firm'){
        alert("Firm Exists . Only 1 firm can be added");
      }
      else{
        alert("Failed to Add firm")
      }

      console.log("This is FirmId",data.firmId);
      const firmId = data.firmId;

      localStorage.setItem('firmId',firmId);
    }
    catch(error){
      console.error("Failed to add Firm")
      alert("Failed to add Firm");
    }
  }
  return (
    <div className='firmSection'>
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>FirmName</label>
        <input type="text" placeholder="" name="firmName" value={firmName} onChange={(e) => setFirmName(e.target.value)}/><br/>

        <label>Area</label>
        <input type="text" placeholder="" name="area" value={area} onChange={(e) => setArea(e.target.value)} /><br />

        
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label htmlFor="">Veg</label>
              <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
            </div>
            <div className="checkboxContainer">
              <label htmlFor="">Non-Veg</label>
              <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
            </div>
          </div>

        </div>

        <div className="checkInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="regionboxContainer">
              <label htmlFor="">South Indian</label>
              <input type="checkbox" value="South-Indian" checked={region.includes('South-Indian')} onChange={handleRegionChange}/>
            </div>
            <div className="regionboxContainer">
              <label htmlFor="">Noth Indian</label>
              <input type="checkbox" value="North-Indian" checked={region.includes('North-Indian')} onChange={handleRegionChange}/>
            </div>
            <div className="regionboxContainer">
              <label htmlFor="">Chinese</label>
              <input type="checkbox" value="Chinese" checked={region.includes('Chinese')} onChange={handleRegionChange}/>
            </div>
            <div className="regionboxContainer">
              <label htmlFor="">Bakery</label>
              <input type="checkbox" value="Bakery" checked={region.includes('Bakery')} onChange={handleRegionChange}/>
            </div>
          </div>

        </div>

        <label>Offer</label>
        <input type="text" placeholder="" name="offer" value={offer} onChange={(e) => setOffer(e.target.value)}/><br />

        <label>Firm Image</label>
        <input type="file" placeholder="" name="file" onChange={handleImageUpload}/><br />

        <div className='btnSubmit'>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddFirm
