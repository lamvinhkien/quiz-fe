import { useState, useEffect } from 'react';
import { GetAllQuiz, GetAllCategory } from '../../../Services/QuizAPI';
import './QuizExam.scss'
import QuestionExam from '../Question/QuestionExam';

const QuizExam = () => {
    const [quizList, setQuizList] = useState([])
    const [condition, setCondition] = useState('')
    const [quizId, setQuizId] = useState('')
    const [isStart, setIsStart] = useState(false)
    const [listCategory, setListCategory] = useState([])
    const defaultValidate = {
        condition: true,
        quiz: true
    }
    const [isValidate, setIsValidate] = useState(defaultValidate)

    const handleGetAllCategory = async () => {
        let res = await GetAllCategory()
        if (res && res.data) {
            if (res.data.length > 0) {
                setListCategory(res.data)
                return
            }
            setListCategory('')
            return
        }
    }
    const handleGetAllQuiz = async () => {
        let res = await GetAllQuiz(condition)
        if (res && res.data) {
            if (res.data.length > 0) {
                setQuizList(res.data)
                return
            }
            setQuizList('')
        }
    }
    const handleChangeCondition = (value) => {
        setCondition(value)
        setQuizId('')
        setQuizList([])
        setIsValidate(defaultValidate)
        setIsStart(false)
    }
    const handleChangeQuiz = (value) => {
        setQuizId(value)
        setIsValidate(defaultValidate)
        setIsStart(false)
    }
    const handleStart = () => {
        if (condition === '') {
            setIsValidate({ ...defaultValidate, condition: false })
            return
        }
        if (quizId === '') {
            setIsValidate({ ...defaultValidate, quiz: false })
            return
        }
        setIsStart(true)
    }

    useEffect(() => {
        if (condition !== '') {
            handleGetAllQuiz()
        }
    }, [condition])

    useEffect(() => {
        handleGetAllCategory()
    }, [])

    return (
        <div className="QuizExam container">
            <div className='Quiz-Exam'>
                <div className='row'>
                    <div className='col-md-12 col-lg-6 mt-2'>
                        <div className="row align-items-center">
                            <div className='col-md-12 col-lg-5 mt-1'>
                                <label className="text-nowrap mx-2 select-font-size">Chọn hạng bằng lái:</label>
                            </div>
                            <div className='col-md-12 col-lg-7 mt-1 select-font-size'>
                                {
                                    listCategory && listCategory.length > 0 ?
                                        <select className={isValidate.condition ? 'form-select' : 'form-select is-invalid'} style={{ fontSize: '18px' }} onChange={(event) => { handleChangeCondition(event.target.value) }}>
                                            <option value=''>Chọn hạng bằng lái</option>
                                            {
                                                listCategory.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        :
                                        <div className='d-flex align-items-center justify-content-center justify-content-lg-end gap-2' style={{ color: '#38A6F3', height: '40px' }}>
                                            {
                                                listCategory === '' ?
                                                    <div className='fst-italic fw-medium'>
                                                        Không có hạng bằng lái.
                                                    </div>
                                                    :
                                                    <>
                                                        <div className='fst-italic fw-medium'>
                                                            Đang tải hạng bằng lái...
                                                        </div>
                                                        <div className="spinner-border" role="status" style={{ width: '24px', height: '24px' }}></div>
                                                    </>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 col-lg-4 mt-2'>
                        <div className="row align-items-center">
                            <div className='col-md-12 col-lg-5 mt-1'>
                                <label className="text-nowrap mx-2 select-font-size">Chọn đề thi:</label>
                            </div>
                            <div className='col-md-12 col-lg-7 mt-1 select-font-size'>
                                {condition !== '' ?
                                    <>
                                        {
                                            quizList && quizList.length > 0 ?
                                                <select className={isValidate.quiz ? 'form-select' : 'form-select is-invalid'} style={{ fontSize: '18px' }} value={'' || quizId}
                                                    onChange={(event) => { handleChangeQuiz(event.target.value) }}>
                                                    <option value=''>Chọn đề thi</option>
                                                    {
                                                        quizList.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.id}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                :
                                                <div className='d-flex align-items-center justify-content-center justify-content-lg-end gap-2' style={{ color: '#38A6F3', height: '40px' }}>
                                                    {
                                                        quizList === '' ?
                                                            <div className='fst-italic fw-medium'>
                                                                Không có đề thi.
                                                            </div>
                                                            :
                                                            <>
                                                                <div className='fst-italic fw-medium'>
                                                                    Đang tải đề thi...
                                                                </div>
                                                                <div className="spinner-border" role="status" style={{ width: '24px', height: '24px' }}></div>
                                                            </>
                                                    }
                                                </div>
                                        }
                                    </>
                                    :
                                    <div className='d-flex align-items-center justify-content-center justify-content-lg-end' style={{ color: '#38A6F3', height: '40px' }}>
                                        <div className='fst-italic fw-medium'>
                                            Hãy chọn hạng bằng lái.
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 col-lg-2' style={{ marginTop: '12.2px' }}>
                        <button className='select-font-size fw-medium startBtn' onClick={() => { handleStart() }}>
                            Bắt đầu thi
                        </button>
                    </div>
                </div>
            </div>
            {
                quizId !== '' && isStart === true ?
                    <QuestionExam
                        quizId={quizId}
                        isStart={isStart}
                    />
                    :
                    <div className="d-flex justify-content-center align-items-center py-4 my-3 shadow-sm" style={{ width: '100%', borderRadius: '16px', backgroundColor: '#fff9e6' }}>
                        <div className="text-center">
                            <div className="mb-4">
                                <span className="p-4 bg-warning bg-opacity-25 rounded-circle d-inline-block animate__animated animate__pulse animate__infinite">
                                    <i className="fa fa-book text-warning" style={{ fontSize: '40px' }}></i>
                                </span>
                            </div>

                            <h4 className="fw-bold text-dark mb-2">Bạn đã sẵn sàng cho bài thi thử?</h4>

                            <p className="text-muted fs-6 px-3 mb-4">
                                Vui lòng chọn một đề thi ở phía trên để bắt đầu tính giờ làm bài.
                            </p>

                            <div className="bg-white p-3 rounded-3 border text-start mx-2">
                                <h6 className="fw-bold text-secondary mb-2">
                                    <i className="fa fa-info-circle me-2 text-primary"></i> Lưu ý trước khi thi:
                                </h6>
                                <ul className="text-muted small mb-0 ps-3" style={{ lineHeight: '1.6' }}>
                                    <li>Mỗi đề thi sẽ có thời gian đếm ngược cố định.</li>
                                    <li>Kết quả và đáp án chi tiết sẽ hiển thị ngay sau khi bạn nộp bài.</li>
                                    <li>Đảm bảo kết nối mạng ổn định trong suốt quá trình làm bài.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}

export default QuizExam;