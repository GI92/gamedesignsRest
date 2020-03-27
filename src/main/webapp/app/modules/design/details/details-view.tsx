import React, {useEffect} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {Translate, translate} from 'react-jhipster';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {IRootState} from 'app/shared/reducers';
import {getSession} from 'app/shared/reducers/authentication';
import {Link, RouteComponentProps} from 'react-router-dom';
import {editView, getDesign, reset, updateDesign} from 'app/modules/design/details/details.reducer';

export interface IDesignDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const DetailsPage = (props: IDesignDetailsProps) => {

  useEffect(() => {
    props.getDesign(props.match.params.id);
  }, []);

  const {design, match} = props;

  // Add rows to textarea
  const handleDescriptionChange = () => {
    const textArea = document.querySelector('textarea');
    if (textArea.clientHeight < textArea.scrollHeight) {
      textArea.rows = textArea.rows + 1;
    }
  };

  const handleValidSubmit = (event, values) => {
    values.id = design.id;
    values.username = design.username;
    props.updateDesign(values);
  };

  const edit = () => {
    props.editView();
  };

  const canEdit = props.isAuthenticated && (design.username === props.account.login);

  return (
    <div>
      <h2 id="design-title">
        <Translate contentKey="design.detail.name" interpolate={{name: design.name}}/>
      </h2>
      {(!props.edit) ?
        <Row className="justify-content-between">
          <Col md="8">
            <h5 id="design-description">
              <Translate contentKey="design.detail.description"/>
            </h5>
          </Col>
          <Col md="8">
            <p>
              {design.description}
            </p>
          </Col>
        </Row>
        :
        <div>
          <AvForm onValidSubmit={handleValidSubmit}>
            <Row className="justify-content-between">
              <Col md="8">

                <AvField
                  name="name"
                  label={translate('design.form.name.label')}
                  placeholder={translate('design.form.name.placeholder')}
                  value={design.name}
                  validate={{
                    required: {value: true, errorMessage: translate('design.messages.validate.name.required')},
                    maxLength: {value: 100, errorMessage: translate('design.messages.validate.name.maxLength')}
                  }}
                />
                <AvField
                  type="textarea"
                  name="description"
                  rows="10"
                  label={translate('design.form.description.label')}
                  placeholder={translate('design.form.description.placeholder')}
                  value={design.description}
                  onChange={handleDescriptionChange}
                  validate={{
                    required: {value: true, errorMessage: translate('design.messages.validate.description.required')}
                  }}
                />
              </Col>
            </Row>
            <Row className="justify-content-lg-start">
              <Col md="1">
                <Button id="create-submit" color="primary" type="submit" onClick={edit}>
                  <Translate contentKey="design.form.button.cancel">Cancel</Translate>
                </Button>
              </Col>
              <Col md="1">
                <Button id="create-submit" color="primary" type="submit">
                  <Translate contentKey="design.form.button.update">Update</Translate>
                </Button>
              </Col>
            </Row>
          </AvForm>
        </div>
      }
      {(!props.edit && canEdit) ?
        <Row className="justify-content-lg-start">
          <Col md="1">
            <Button id="create-submit" color="primary" type="submit" onClick={edit}>
              <Translate contentKey="design.form.button.edit">Edit</Translate>
            </Button>
          </Col>
          <Col md="1">
            <Button
              tag={Link}
              to={`${match.url}/delete`}
              color="danger"
            >
              <Translate contentKey="design.form.button.delete">Delete</Translate>
            </Button>
          </Col>
        </Row>
        :
        <p/>
      }
    </div>
  );
};

const mapStateToProps = ({authentication, design}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  design: design.design,
  edit: design.edit
});

const mapDispatchToProps = {getSession, getDesign, reset, editView, updateDesign};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)
