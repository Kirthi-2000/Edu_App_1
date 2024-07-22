import React, { useContext, useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../../hooks/useDarkMode';
import { demoPagesMenu } from '../../../menu';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { TABS, TTabs } from './common/helper';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import ThemeContext from '../../../contexts/themeContext';
import { FaTimes } from 'react-icons/fa'; // Importing FontAwesome icon
import { FaUpload } from 'react-icons/fa';


interface SimpleFormProps {
  role: string;
}

const SimpleForm: React.FC<SimpleFormProps> = ({ role }) => {
	const [files, setFiles] = useState<File[]>([]);
  
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  if (event.target.files) {
		setFiles([...files, ...Array.from(event.target.files)]);
	  }
	};
  
	const handleFileDelete = (index: number) => {
	  const updatedFiles = files.filter((_, i) => i !== index);
	  setFiles(updatedFiles);
	};
  
	return (
	  <form>
		<div className="mb-3">
		  <label htmlFor={`${role}-name`} className="form-label">Name</label>
		  <input type="text" className="form-control" id={`${role}-name`} />
		</div>
		<div className="mb-3">
		  <label htmlFor={`${role}-email`} className="form-label">Email</label>
		  <input type="email" className="form-control" id={`${role}-email`} />
		</div>
		{role !== 'student' && (
		  <div className="mb-3">
			<label htmlFor={`${role}-college`} className="form-label">College</label>
			<input type="text" className="form-control" id={`${role}-college`} />
		  </div>
		)}
		{role === 'tutor' && (
		  <div className="mb-3">
			<label htmlFor={`${role}-hod`} className="form-label">HOD</label>
			<select className="form-control" id={`${role}-hod`}>
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
			  <input type="text" className="form-control" id={`${role}-rollno`} />
			</div>
			<div className="mb-3">
			  <label htmlFor={`${role}-phone`} className="form-label">Phone No</label>
			  <input type="text" className="form-control" id={`${role}-phone`} />
			</div>
			<div className="mb-3">
			  <label htmlFor={`${role}-email`} className="form-label">Email ID</label>
			  <input type="email" className="form-control" id={`${role}-email`} />
			</div>
			<div className="mb-3">
			  <label htmlFor={`${role}-batch`} className="form-label">Batch</label>
			  <input type="text" className="form-control" id={`${role}-batch`} />
			</div>
			<div className="mb-3">
			  <label htmlFor={`${role}-department`} className="form-label">Department</label>
			  <input type="text" className="form-control" id={`${role}-department`} />
			</div>
			<div className="mb-3">
			  <label htmlFor={`${role}-college`} className="form-label">College</label>
			  <input type="text" className="form-control" id={`${role}-college`} />
			</div>
		  </>
		)}
		<div className="mb-3">
		  <label htmlFor={`${role}-attachments`} className="form-label">Attachments</label>
		  <input type="file" className="form-control" id={`${role}-attachments`} multiple onChange={handleFileChange} />
		</div>
		<div className="mb-3">
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
		<button type="submit" className="btn btn-primary">Submit</button>
	  </form>
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

  const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);

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
