import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteCategory(props) {
    return (
        <Modal show={props.show} onHide={props.hide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xoá danh mục</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc muốn xoá danh mục này?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hide}>
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
                                />
                            </>
                            :
                            'Xác nhận'
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteCategory;