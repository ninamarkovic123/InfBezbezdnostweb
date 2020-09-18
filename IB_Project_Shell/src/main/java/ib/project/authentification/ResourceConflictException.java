package ib.project.authentification;

public class ResourceConflictException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7707161176014064230L;
	private Long resourceId;

	public ResourceConflictException(Long resourceId, String message) {
		super(message);
		this.setResourceId(resourceId);
	}

	public Long getResourceId() {
		return resourceId;
	}

	public void setResourceId(Long resourceId) {
		this.resourceId = resourceId;
	}

}
