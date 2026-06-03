import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteQuiz(props) {
    return (
        <Modal
            show={props.show}
            onHide={!props.isDeleting ? props.hide : undefined}
            centered
            backdrop={props.isDeleting ? 'static' : true}
            keyboard={!props.isDeleting}
        >
            <Modal.Header closeButton={!props.isDeleting}>
                <Modal.Title>
                    Xác nhận xoá bài thi
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Bạn có chắc muốn xoá bài thi này?
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={props.hide}
                    disabled={props.isDeleting}
                >
                    Đóng
                </Button>

                <Button
                    variant="danger"
                    onClick={props.delete}
                    disabled={props.isDeleting}
                >
                    {
                        props.isDeleting ?
                            <>
                                Đang xoá
                                <span
                                    className="spinner-border spinner-border-sm ms-2"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </span>
                            </>
                            :
                            'Xoá'
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteQuiz;