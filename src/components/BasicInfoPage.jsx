import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BasicInfoPage.css';

const BasicInfoPage = ({ setUserInfo }) => {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [district, setDistrict] = useState('');
  const [errors, setErrors] = useState({});

  const bangladeshDistricts = [
    'Barisal', 'Bhola', 'Jhalokati', 'Patuakhali',
    'Chittagong', 'Cox\'s Bazar', 'Feni', 'Khagrachari', 'Noakhali', 'Rangamati',
    'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Shariatpur', 'Tangail',
    'Khulna', 'Bagerhat', 'Chuadanga', 'Jessore', 'Khulna', 'Magura', 'Narail', 'Satkhira',
    'Mymensingh', 'Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur',
    'Rajshahi', 'Bogura', 'Joypurhat', 'Natore', 'Naogaon', 'Pabna', 'Rajshahi',
    'Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon',
    'Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet'
  ];

  const handleContinue = () => {
    let newErrors = {};

    if (age && (isNaN(age) || age < 1 || age > 120)) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userInfo = {
      age: age || null,
      district: district || null,
      device: navigator.userAgent
    };

    setUserInfo(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate('/emotions');
  };

  return (
    <div className="basic-info-page">
      <div className="container">
        <div className="info-card">
          {/* Header */}
          <div className="info-header">
            <h1>👤 Basic Information</h1>
            <p>(Optional - helps with research analysis)</p>
          </div>

          {/* Form */}
          <div className="form">
            {/* Age Field */}
            <div className="form-group">
              <label htmlFor="age">Age (Optional)</label>
              <input
                type="number"
                id="age"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                max="120"
              />
              {errors.age && <p className="error">{errors.age}</p>}
            </div>

            {/* District Field */}
            <div className="form-group">
              <label htmlFor="district">District (Optional)</label>
              <select
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">Select your district</option>
                {bangladeshDistricts.map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Info Message */}
            <div className="info-message">
              <p>✓ This information is completely optional</p>
              <p>✓ It helps us understand the diversity of contributors</p>
              <p>✓ Your privacy is protected</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button className="btn btn-primary" onClick={handleContinue}>
              Continue ➜
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoPage;
