import React, { useContext, useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../hooks/useDarkMode';
import { demoPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'; // Import PageWrapper
import Page from '../../../layout/Page/Page';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import ThemeContext from '../../../contexts/themeContext';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { Tabs, Tab } from 'react-bootstrap'; // Import Tabs and Tab from react-bootstrap
import './CustomTabs.css'; // Import custom CSS

interface SimpleFormProps {
  role: string;
}

const SimpleForm: React.FC<SimpleFormProps> = ({ role }) => {
	const initialFormState = {
	  name: '',
	  email: '',
	  college: '',
	  hod: '',
	  rollno: '',
	  phone: '',
	  batch: '',
	  department: '',
	};
  
	const [formState, setFormState] = useState(initialFormState);
	const [files, setFiles] = useState<File[]>([]);
	const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  if (event.target.files) {
		setFiles([...files, ...Array.from(event.target.files)]);
	  }
	};
  
	const handleFileDelete = (index: number) => {
	  const updatedFiles = files.filter((_, i) => i !== index);
	  setFiles(updatedFiles);
	};
  
	const handleUpload = () => {
	  // Simulate an upload process
	  setUploadStatus('Uploading...');
	  setTimeout(() => {
		setUploadStatus('Upload successful');
	  }, 2000);
	};
  
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	  const { id, value } = event.target;
	  setFormState({ ...formState, [id.split('-')[1]]: value });
	};
  
	const handleReset = () => {
	  setFormState(initialFormState);
	};
  
	const handleSubmit = (event: React.FormEvent) => {
	  event.preventDefault();
	  console.log('Form submitted:', formState);
	};
  
	return (
	  <Tabs defaultActiveKey="form" id={`${role}-tabs`} className="mb-3">
		<Tab eventKey="form" title="Form">
		  <form onSubmit={handleSubmit}>
			<div className="mb-3">
			  <label htmlFor={`${role}-name`} className="form-label">Name</label>
			  <input type="text" className="form-control" id={`${role}-name`} value={formState.name} onChange={handleInputChange} />
			</div>
			<div className="mb-3">
			  <label htmlFor={`${role}-email`} className="form-label">Email</label>
			  <input type="email" className="form-control" id={`${role}-email`} value={formState.email} onChange={handleInputChange} />
			</div>
			{role !== 'student' && (
			  <div className="mb-3">
				<label htmlFor={`${role}-college`} className="form-label">College</label>
				<input type="text" className="form-control" id={`${role}-college`} value={formState.college} onChange={handleInputChange} />
			  </div>
			)}
			{role === 'tutor' && (
			  <div className="mb-3">
				<label htmlFor={`${role}-hod`} className="form-label">HOD</label>
				<select className="form-control" id={`${role}-hod`} value={formState.hod} onChange={handleInputChange}>
				  <option value="hod1">HOD 1</option>
				  <option value="hod2">HOD 2</option>
				  <option value="hod3">HOD 3</option>
				</select>
			  </div>
			)}
			{role === 'student' && (
			  <>
				<div className="mb-3">
				  <label htmlFor={`${role}-rollno`} className="form-label">Roll No</label>
				  <input type="text" className="form-control" id={`${role}-rollno`} value={formState.rollno} onChange={handleInputChange} />
				</div>
				<div className="mb-3">
				  <label htmlFor={`${role}-phone`} className="form-label">Phone No</label>
				  <input type="text" className="form-control" id={`${role}-phone`} value={formState.phone} onChange={handleInputChange} />
				</div>
				<div className="mb-3">
				  <label htmlFor={`${role}-email`} className="form-label">Email ID</label>
				  <input type="email" className="form-control" id={`${role}-email`} value={formState.email} onChange={handleInputChange} />
				</div>
				<div className="mb-3">
				  <label htmlFor={`${role}-batch`} className="form-label">Batch</label>
				  <input type="text" className="form-control" id={`${role}-batch`} value={formState.batch} onChange={handleInputChange} />
				</div>
				<div className="mb-3">
				  <label htmlFor={`${role}-department`} className="form-label">Department</label>
				  <input type="text" className="form-control" id={`${role}-department`} value={formState.department} onChange={handleInputChange} />
				</div>
				<div className="mb-3">
				  <label htmlFor={`${role}-college`} className="form-label">College</label>
				  <input type="text" className="form-control" id={`${role}-college`} value={formState.college} onChange={handleInputChange} />
				</div>
			  </>
			)}
			<button type="submit" className="btn btn-primary me-2">Create</button>
			<button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
		  </form>
		</Tab>
		<Tab eventKey="attachments" title="Bulk Upload">
		  <div className="attachments-section mb-3 p-3 border rounded bg-light">
			<label htmlFor={`${role}-attachments`} className="form-label">Bulk Upload</label>
			<input type="file" className="form-control mb-2" id={`${role}-attachments`} multiple onChange={handleFileChange} />
			<button type="button" className="btn btn-secondary" onClick={handleUpload}>
			  <FaUpload className="me-2" />Upload
			</button>
			{uploadStatus && <div className="mt-2">{uploadStatus}</div>}
		  </div>
		  <div className="attachments-list mb-3">
			{files.map((file, index) => (
			  <div key={index} className="d-flex justify-content-between align-items-center">
				<span>{file.name}</span>
				<FaTimes
				  className="text-danger"
				  style={{ cursor: 'pointer' }}
				  onClick={() => handleFileDelete(index)}
				/>
			  </div>
			))}
		  </div>
		</Tab>
	  </Tabs>
	);
  };
const DashboardPage: React.FC = () => {
  const { mobileDesign } = useContext(ThemeContext);

  /**
   * Tour Start
   */
  const { setIsOpen } = useTour();
  useEffect(() => {
    if (localStorage.getItem('tourModalStarted') !== 'shown' && !mobileDesign) {
      setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('tourModalStarted', 'shown');
      }, 7000);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { themeStatus } = useDarkMode();

  return (
    <PageWrapper title={demoPagesMenu.sales.subMenu.dashboard.text}>
      <Page container='fluid'>
        <div className='row'>
          <div className='row g-4'>
            <div className='col-lg-12'>
              <Accordion id='accSample' activeItemId={false}>
                <AccordionItem id='accor1' title='HOD' icon='Person'>
                  <SimpleForm role="hod" />
                </AccordionItem>
                <AccordionItem id='accor2' title='TUTOR' icon='Person'>
                  <SimpleForm role="tutor" />
                </AccordionItem>
                <AccordionItem id='accor3' title='STUDENT' icon='Person'>
                  <SimpleForm role="student" />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default DashboardPage;