package br.ufrj.cos482.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SecretarioAcademico.
 */
@Entity
@Table(name = "secretario_academico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SecretarioAcademico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Usuario usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public SecretarioAcademico usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SecretarioAcademico secretarioAcademico = (SecretarioAcademico) o;
        if(secretarioAcademico.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, secretarioAcademico.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SecretarioAcademico{" +
            "id=" + id +
            '}';
    }
}
