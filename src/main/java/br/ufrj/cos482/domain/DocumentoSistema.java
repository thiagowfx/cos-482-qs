package br.ufrj.cos482.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import br.ufrj.cos482.domain.enumeration.StatusDocumento;

/**
 * A DocumentoSistema.
 */
@Entity
@Table(name = "documento_sistema")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DocumentoSistema implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "formato")
    private String formato;

    @Column(name = "timestamp_envio")
    private ZonedDateTime timestampEnvio;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusDocumento status;

    @Column(name = "escopo")
    private Integer escopo;

    @Column(name = "caminho")
    private String caminho;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public DocumentoSistema tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getFormato() {
        return formato;
    }

    public DocumentoSistema formato(String formato) {
        this.formato = formato;
        return this;
    }

    public void setFormato(String formato) {
        this.formato = formato;
    }

    public ZonedDateTime getTimestampEnvio() {
        return timestampEnvio;
    }

    public DocumentoSistema timestampEnvio(ZonedDateTime timestampEnvio) {
        this.timestampEnvio = timestampEnvio;
        return this;
    }

    public void setTimestampEnvio(ZonedDateTime timestampEnvio) {
        this.timestampEnvio = timestampEnvio;
    }

    public StatusDocumento getStatus() {
        return status;
    }

    public DocumentoSistema status(StatusDocumento status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusDocumento status) {
        this.status = status;
    }

    public Integer getEscopo() {
        return escopo;
    }

    public DocumentoSistema escopo(Integer escopo) {
        this.escopo = escopo;
        return this;
    }

    public void setEscopo(Integer escopo) {
        this.escopo = escopo;
    }

    public String getCaminho() {
        return caminho;
    }

    public DocumentoSistema caminho(String caminho) {
        this.caminho = caminho;
        return this;
    }

    public void setCaminho(String caminho) {
        this.caminho = caminho;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DocumentoSistema documentoSistema = (DocumentoSistema) o;
        if(documentoSistema.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, documentoSistema.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "DocumentoSistema{" +
            "id=" + id +
            ", tipo='" + tipo + "'" +
            ", formato='" + formato + "'" +
            ", timestampEnvio='" + timestampEnvio + "'" +
            ", status='" + status + "'" +
            ", escopo='" + escopo + "'" +
            ", caminho='" + caminho + "'" +
            '}';
    }
}
