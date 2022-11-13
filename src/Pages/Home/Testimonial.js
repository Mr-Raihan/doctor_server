import React from 'react';
import quotes from '../../assets/icons/quote.svg';
import people1 from '../../assets/images/people1.png';
import people2 from '../../assets/images/people2.png';
import people3 from '../../assets/images/people3.png';
import ReviewCard from './ReviewCard';

const Testimonial = () => {
    const reviews=[
        {
            _id:1,
            name:"mr raihan",
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, sapiente pariatur? Eaque delectus id rerum odit reiciendis nesciunt fugiat rem veniam laboriosam inventore.",
            location:'chandpur',
            img:people1
        },
        {
            _id:2,
            name:"mrs moriom",
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, sapiente pariatur? Eaque delectus id rerum odit reiciendis nesciunt fugiat rem veniam laboriosam inventore.",
            location:'shandweep',
            img:people2
        },
        {
            _id:3,
            name:"mrs moyna",
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, sapiente pariatur? Eaque delectus id rerum odit reiciendis nesciunt fugiat rem veniam laboriosam inventore.",
            location:'chattogram',
            img:people3
        },

    ]
    return (
        <section className='my-28'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='text-xl text-primary font-bold'>Testimonial</h4>
                    <h3 className='text-3xl'>What Our Patients Says</h3>
                </div>
                <div>
                    <img src={quotes} className="sm:w-24 lg:w-48" alt="" />
                </div>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-8'>
                {
                    reviews.map(review=><ReviewCard
                    key={review._id}
                    review={review}
                    ></ReviewCard>)
                }
            </div>
        </section>
    );
};

export default Testimonial;