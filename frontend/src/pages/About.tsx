import React from 'react';
import { Card } from '../components/Card';
import { CheckCircle, Users, Award, Clock, HeartPulse } from 'lucide-react';
const About = () => {
  const leadership = [{
    name: 'Dr. Derin Patel MD',
    title: 'Founder, CMO'
  }, {
    name: 'Mr. Blake Tokheim',
    title: 'CEO'
  }, {
    name: 'Ms. Donna Barry',
    title: 'COO'
  }, {
    name: 'Mrs. Durga Patel',
    title: 'CFO'
  }, {
    name: 'Mr. Luis Rangel',
    title: 'Director of Operations'
  }, {
    name: 'Mrs. Samreen Affan',
    title: 'Director of Compliance and Training'
  }, {
    name: 'Dr. Tracey Cawthorn',
    title: ''
  }];
  const providers = ['Dr. Mark Bentley, DO', 'Dr. Vamsi Garimella MD', 'Dr. Suneeta Naik, MD', 'Dr. Amita Kumar, MD', 'Dr. Mary Baker, DNP, FNP-BC', 'Dr. Sandra Rocha, DO', 'Dr. Anais Santoy, DNP, FNP-C', 'Mrs. Monalisa Churchman', 'Ms. Melinda Zamora', 'Mr. Roy Anderson, FNP-C', 'Mrs. Karen Johnson, FNP-C', 'Ms. Florence (FLO) Pugh, NP-C', 'Ms. Fatima Elmaanaoui, FNP-C', 'Mr. Juan Perez, FNP-C', 'Ms. Roselyn Omungo, FNP-C', 'Ms. Priyanka Mooney FNP', 'Mrs. Emily Stansberry, FNP-C', 'Ms. Vanessa R Andrada, PA-C', 'Ms. Khusboo Surtani, PA-C', 'Mrs. Patricia Diaz De Leon, PA-C', 'Laurie Incledon, MSN-APRN, WHNP, CNM', 'Ms. Joni Maxwell, FNP', 'Elizabeth Marcum, MSN, APRN, FNP-C', 'Ms. Emily Gonzales, APRN, FNP-C', 'Seyed Mahdi Hosseini Siahkalmahalleh, FNP-C', 'Oyindamola Stella Akinkugbe, FNP', 'Dr. Mevelyn Morse', 'Mrs. Angela Ellis', 'Diane Turner, APRN, FNP-BC', 'Anuradha Gurram, FNP-C', 'Mrs. Sheryl Woods, FNP-BC', 'Samantha Ann-Logue Esman, MSN, APRN, FNP-BC', 'Sidney Villa FNP-BC', 'Sarah Hessling MSN, APRN, FNP-C', 'Ms. Christy Ponce FNP-BC', 'Liza Schwarz, APRN, FNP-BC', 'Ms. Emily Sun PA-C', 'Christen Richardson PA-C', 'Dr. Douglas Glosup PT, DPT', 'Mrs. Teresa Beard, DNP, FNP-C', 'Dr. Gerardo Vasquez, MD', 'Sydney English, FNP-C'];
  return <div className="py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
        About Us
      </h1>
      <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8"></div>
      <div className="mb-12">
        <Card variant="outlined" className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Hillside Medical Group: Your Trusted Primary Care Provider in San
              Antonio, Texas
            </h2>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Putting Your Health First - About Us
            </h3>
            <p className="text-gray-700 mb-4">
              Your welfare is our main concern at Hillside Medical Group. We are
              a group of medical clinics in San Antonio, Texas and the
              neighborhood, devoted to providing general population with
              first-class primary care, evidence-based & expert healthcare.
            </p>
            <p className="text-gray-700 mb-4">
              Please browse through our website and meet our friendly primary
              care providers who offer a range of medical treatments at our
              medical centers in San Antonio, Texas. We strongly believe in
              providing customized healthcare remedies for you and your loved
              ones.
            </p>
            <p className="text-gray-700 mb-4">
              Thank you for choosing Hillside Medical Group! Schedule an
              appointment today to experience this commitment. Together, let us
              embark on the journey of your healthy life.
            </p>
          </div>
        </Card>
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Experienced Care You Can Count On
        </h2>
        <h3 className="text-lg text-center text-gray-600 mb-8">
          Serving Our Community For 25 Years in San Antonio
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card variant="outlined">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center mb-4">
                <Award size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Experience You Can Trust
              </h3>
              <p className="text-gray-600">
                Our dedicated doctors and primary care providers have 25 years
                of experience, providing personalized attention and the latest
                medical knowledge in treating San Antonio community.
              </p>
            </div>
          </Card>
          <Card variant="outlined">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center mb-4">
                <HeartPulse size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Comfort & Efficiency
              </h3>
              <p className="text-gray-600">
                We ensure that your experience is as comfortable as possible.
                Our providers' knowledge enables us to put you through faster,
                painless processes.
              </p>
            </div>
          </Card>
          <Card variant="outlined">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center mb-4">
                <div size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Top Equipment
              </h3>
              <p className="text-gray-600">
                By using high-quality equipment, Hillside Medical Group ensures
                accurate diagnoses and effective treatments at our primary care
                clinics in San Antonio, Texas.
              </p>
            </div>
          </Card>
          <Card variant="outlined">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center mb-4">
                <Clock size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Always Here for You
              </h3>
              <p className="text-gray-600">
                You want to know that advanced support will always be there for
                you – we offer just that.
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Our Leadership
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {leadership.map((leader, index) => <Card key={index} variant="outlined">
              <div className="p-4 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 bg-gray-50">
                  <Users size={36} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {leader.name}
                </h3>
                {leader.title && <p className="text-gray-600">{leader.title}</p>}
              </div>
            </Card>)}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Our Providers
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          {providers.map((provider, index) => <Card key={index} variant="outlined">
              <div className="p-3 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-3 bg-gray-50">
                  <Users size={24} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-800">{provider}</p>
              </div>
            </Card>)}
        </div>
      </div>
    </div>;
};
export default About;