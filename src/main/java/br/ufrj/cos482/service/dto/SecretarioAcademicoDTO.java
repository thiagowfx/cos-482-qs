package br.ufrj.cos482.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the SecretarioAcademico entity.
 */
public class SecretarioAcademicoDTO implements Serializable {

    private Long id;


    private Long usuarioId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SecretarioAcademicoDTO secretarioAcademicoDTO = (SecretarioAcademicoDTO) o;

        if ( ! Objects.equals(id, secretarioAcademicoDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SecretarioAcademicoDTO{" +
            "id=" + id +
            '}';
    }
}
