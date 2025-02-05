import '../css/Graduate.css';
import '../css/ContentsPage.css';
import axios from 'axios';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { API_URL, PORT_NUMBER } from '../utils/constant';

/**
 * @description Graduate 페이지 컴포넌트
 */
const Graduate = () => {
    const [file, setFile] = useState(null);
    const [mileage, setMileage] = useState(0);
    const [kyCredit, setkyCredit] = useState(0);
    const [majorCredit, setMajorCredit] = useState(0);
    const [nonSubject, setNonSubject] = useState(0);
    const [failure, setFailure] = useState('');
    const [totalCredit, setTotalCredit] = useState(0);
    const [graduateok, setGraduateok] = useState('🤔졸업 되려나..🤔');
    const [color, setColor] = useState({ color: 'black' });
    const [loading, setLoading] = useState(false);

    /**
     * @description 파일 버튼 클릭
     */
    const handleChangeFile = (event) => {
        setLoading(true);
        setFile(event.target.files);
        const fd = new FormData();
        const getFile = document.getElementById('file');
        fd.append('file', getFile.files[0]);
        axios
            .post(`${API_URL}${PORT_NUMBER}/Graduate`, fd, {
                headers: {
                    'Content-Type': `multipart/form-data`,
                },
            })
            .then((response) => {
                setMileage(response.data.mileage);
                setkyCredit(response.data.kyCredit);
                setMajorCredit(response.data.majorCredit);
                setNonSubject(response.data.nonSubject);
                setTotalCredit(response.data.totalCredit);
                setFailure(response.data.failure);

                if (response.data.result === -1) {
                    alert('파일을 읽을 수 없습니다. 다시 확인해주세요');
                    setLoading(false);
                    setColor({ color: 'red' });
                    setGraduateok('파일을 다시 확인해주세요');
                    setLoading(false);
                } else if (response.data.result === 1) {
                    setColor({ color: 'blue' });
                    setGraduateok('😆졸업 가능!😆');
                    setLoading(false);
                } else if (response.data.result === 0) {
                    setColor({ color: 'red' });
                    setGraduateok('😵‍💫졸업 불가능!😵‍💫');
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <main>
                <section className="section">
                    <div className="section__text">
                        당신은 졸업이 가능한가요 ?
                    </div>

                    <form method="post" action="/Graduate">
                        <div className="section__button">
                            <label className="upload__button" for="file">
                                학업성적확인서 PDF 업로드
                            </label>
                            <br />
                            <input
                                type="file"
                                accept=".pdf"
                                id="file"
                                name="file"
                                onChange={handleChangeFile}
                                multiple="multiple"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </form>
                    <br />
                    <div className="pdf__position">
                        <div className="pdf__position--text text-header">
                            ❓ 학업성적확인서 PDF ❓
                        </div>
                        <a
                            href="https://hsctis.hs.ac.kr/app-nexa/index.html"
                            target="_blank"
                            className="pdf__position--text"
                        >
                            👉한신대학교 종합정보시스템
                        </a>
                        <div className="pdf__position--text">👉인트라넷</div>
                        <div className="pdf__position--text">
                            👉학부생서비스
                        </div>
                        <div className="pdf__position--text">👉성적</div>
                        <div className="pdf__position--text">
                            👉학업성적확인서(16학번 이후)
                        </div>
                        <div className="pdf__position--text">👉Save</div>
                    </div>
                    <div className="section__text text-color">
                        교양과목 정보 외의 인적사항 및 학점은 따로 저장하지
                        않습니다!
                    </div>
                    <div className="section__text text-color2"> 
                        현재 학기를 제외한 확실히 수료완료한 학기 기준으로 결과가 출력됩니다.
                    </div>
                    
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="Graduate__check">
                            <div className="Graduate" style={color}>
                                <br /> {graduateok} <br />
                                <br />
                            </div>
                            <div>
                                <table className="OkTable">
                                    <tr className="Ok__menu">
                                        <th className="Lack__Graduate__Credit">
                                            이수 학점
                                        </th>
                                        <th className="Lack__MajorCredit">
                                            전공 학점
                                        </th>
                                        <th className="Lack__KyCredit">
                                            교양 학점
                                        </th>
                                        <th className="Lack__NonSub">
                                            비교과 이수 학기
                                        </th>
                                        <th className="Lack__mileage">
                                            마일리지
                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="Lack__Graduate__Credit">
                                            {totalCredit}
                                        </td>
                                        <td className="Lack__MajorCredit">
                                            {majorCredit}
                                        </td>
                                        <td className="Lack__KyCredit">
                                            {kyCredit}
                                        </td>
                                        <td className="Lack__NonSub">
                                            {nonSubject}
                                        </td>
                                        <td className="Lack__mileage">
                                            {mileage}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="Graduate_lack">{failure}</div>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Graduate;
